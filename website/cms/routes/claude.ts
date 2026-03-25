import { Hono } from 'hono'
import { streamText, convertToModelMessages } from 'ai'
import { claudeCode } from 'ai-sdk-provider-claude-code'
import {
  listSessions,
  getSessionMessages,
  query,
  type Query,
} from '@anthropic-ai/claude-agent-sdk'
import { ROOT_DIR } from '../root.js'

export const claudeRoutes = new Hono()

// Tools that are auto-allowed (no permission prompt)
const allowedTools = [
  'Read',
  'Edit',
  'Write',
  'Grep',
  'Glob',
  'Agent',
  'TodoWrite',
  'NotebookEdit',
]

// Auth status cache
let statusCache: {
  result: { authenticated: boolean; error?: string; account?: unknown }
  timestamp: number
} | null = null
const STATUS_CACHE_TTL = 60_000

// Active login query (kept alive during OAuth flow)
let loginQuery: Query | null = null
let loginAbortController: AbortController | null = null

function cleanupLoginQuery() {
  loginQuery?.close()
  loginQuery = null
  loginAbortController?.abort()
  loginAbortController = null
}

claudeRoutes.get('/status', async (c) => {
  const force = c.req.query('force') === 'true'
  if (
    !force &&
    statusCache &&
    Date.now() - statusCache.timestamp < STATUS_CACHE_TTL
  ) {
    return c.json(
      statusCache.result,
      statusCache.result.authenticated ? 200 : 401
    )
  }

  const abortController = new AbortController()
  const timeout = setTimeout(() => abortController.abort(), 30_000)

  try {
    const q = query({
      // Streaming input that never yields — we only want the init phase
      prompt: (async function* () {
        await new Promise(() => {})
      })(),
      options: {
        cwd: ROOT_DIR,
        persistSession: false,
        abortController,
      },
    })

    const init = await q.initializationResult()
    clearTimeout(timeout)
    q.close()

    const account = init.account
    // tokenSource "none" means no credentials are configured
    if (!account || account.tokenSource === 'none') {
      const result = {
        authenticated: false as const,
        error: 'Not logged in.',
        account,
      }
      statusCache = { result, timestamp: Date.now() }
      return c.json(result, 401)
    }

    const result = { authenticated: true as const, account }
    statusCache = { result, timestamp: Date.now() }
    return c.json(result)
  } catch (error) {
    clearTimeout(timeout)
    abortController.abort()
    const message =
      error instanceof Error ? error.message : 'Authentication required'
    const result = { authenticated: false as const, error: message }
    statusCache = { result, timestamp: Date.now() }
    return c.json(result, 401)
  }
})

// Start OAuth login flow — returns URLs to open in browser
claudeRoutes.post('/login', async (c) => {
  cleanupLoginQuery()

  loginAbortController = new AbortController()
  const timeout = setTimeout(() => {
    cleanupLoginQuery()
  }, 5 * 60_000) // 5 min timeout for the whole login flow

  try {
    loginQuery = query({
      prompt: (async function* () {
        await new Promise(() => {})
      })(),
      options: {
        cwd: ROOT_DIR,
        persistSession: false,
        abortController: loginAbortController,
      },
    })

    await loginQuery.initializationResult()

    // Start OAuth — returns { manualUrl, automaticUrl }
    const result = await loginQuery.claudeAuthenticate(true)
    clearTimeout(timeout)
    return c.json(result)
  } catch (error) {
    clearTimeout(timeout)
    cleanupLoginQuery()
    const message = error instanceof Error ? error.message : 'Login failed'
    return c.json({ error: message }, 500)
  }
})

// Wait for OAuth flow to complete (called after user opens login URL)
claudeRoutes.post('/login/wait', async (c) => {
  if (!loginQuery) {
    return c.json({ error: 'No login in progress' }, 400)
  }

  try {
    const result = await loginQuery.claudeOAuthWaitForCompletion()
    cleanupLoginQuery()
    statusCache = null
    return c.json(result)
  } catch (error) {
    cleanupLoginQuery()
    const message = error instanceof Error ? error.message : 'Login failed'
    return c.json({ error: message }, 500)
  }
})

// AI SDK chat endpoint - compatible with assistant-ui
claudeRoutes.post('/chat', async (c) => {
  const body = await c.req.json()
  const { messages } = body
  const sessionId = c.req.query('sessionId') || body.sessionId

  const result = streamText({
    model: claudeCode('sonnet', {
      allowedTools,
      cwd: ROOT_DIR,
      ...(sessionId ? { resume: sessionId } : {}),
    }),
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
})

// List recent conversations
claudeRoutes.get('/conversations', async (c) => {
  const limit = parseInt(c.req.query('limit') || '20')
  try {
    const sessions = await listSessions({ dir: ROOT_DIR, limit })
    return c.json(
      sessions.map((s) => ({
        id: s.sessionId,
        summary: s.summary,
        firstPrompt: s.firstPrompt,
        lastModified: s.lastModified,
        customTitle: s.customTitle,
      }))
    )
  } catch {
    return c.json([])
  }
})

// Get messages for a specific conversation
claudeRoutes.get('/conversations/:id/messages', async (c) => {
  const sessionId = c.req.param('id')
  try {
    const messages = await getSessionMessages(sessionId, { dir: ROOT_DIR })
    return c.json(messages)
  } catch {
    return c.json([])
  }
})
