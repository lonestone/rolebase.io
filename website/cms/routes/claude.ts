import { Hono } from 'hono'
import { streamText, convertToModelMessages } from 'ai'
import { claudeCode } from 'ai-sdk-provider-claude-code'
import type { CanUseTool } from 'ai-sdk-provider-claude-code'
import {
  listSessions,
  getSessionMessages,
  query,
  type Query,
} from '@anthropic-ai/claude-agent-sdk'
import { readFile } from 'fs/promises'
import { join } from 'path'
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

// --- Permission request handling ---

interface PendingPermission {
  id: string
  toolName: string
  input: Record<string, unknown>
  title?: string
  decisionReason?: string
  resolve: (
    result: { behavior: 'allow' } | { behavior: 'deny'; message: string }
  ) => void
}

let pendingPermission: PendingPermission | null = null
let permissionIdCounter = 0
// SSE listeners waiting for permission events
const permissionListeners = new Set<(perm: PendingPermission) => void>()

const canUseTool: CanUseTool = async (toolName, input, options) => {
  const id = String(++permissionIdCounter)
  return new Promise((resolve) => {
    const perm: PendingPermission = {
      id,
      toolName,
      input,
      title: options.title,
      decisionReason: options.decisionReason,
      resolve,
    }
    pendingPermission = perm
    // Notify all SSE listeners
    for (const listener of permissionListeners) {
      listener(perm)
    }
  })
}

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

  // Clear any stale pending permission from a previous request
  pendingPermission = null

  const result = streamText({
    model: claudeCode('sonnet', {
      allowedTools,
      canUseTool,
      cwd: ROOT_DIR,
      ...(sessionId ? { resume: sessionId } : {}),
    }),
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
})

// SSE stream for permission requests (no polling needed)
claudeRoutes.get('/permissions/events', (c) => {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()
      const send = (perm: PendingPermission) => {
        const data = JSON.stringify({
          id: perm.id,
          toolName: perm.toolName,
          input: perm.input,
          title: perm.title,
          decisionReason: perm.decisionReason,
        })
        controller.enqueue(encoder.encode(`data: ${data}\n\n`))
      }

      // Send current pending permission if any
      if (pendingPermission) send(pendingPermission)

      // Listen for future permission requests
      permissionListeners.add(send)

      // Cleanup when client disconnects
      c.req.raw.signal.addEventListener('abort', () => {
        permissionListeners.delete(send)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
})

// Respond to a permission request
claudeRoutes.post('/permissions/:id/respond', async (c) => {
  const id = c.req.param('id')
  const { behavior, message } = await c.req.json()

  if (!pendingPermission || pendingPermission.id !== id) {
    return c.json({ error: 'No matching pending permission' }, 404)
  }

  const perm = pendingPermission
  pendingPermission = null

  if (behavior === 'allow') {
    perm.resolve({ behavior: 'allow', updatedInput: perm.input })
  } else {
    perm.resolve({
      behavior: 'deny',
      message: message || 'User denied permission',
    })
  }

  return c.json({ ok: true })
})

/** Try to read the JSONL transcript for a session, searching known project dirs */
async function readSessionJsonl(sessionId: string): Promise<string> {
  const home = process.env.HOME || '~'
  const projectsDir = join(home, '.claude', 'projects')
  // The project dir name is the cwd with slashes replaced by dashes, leading dash stripped
  // Sessions may be under ROOT_DIR or its parent depending on the cwd used
  const candidates = [
    ROOT_DIR,
    join(ROOT_DIR, '..'), // parent (e.g. rolebase vs rolebase/website)
  ]
  for (const dir of candidates) {
    const resolved = dir.replace(/\//g, '-')
    const path = join(projectsDir, resolved, `${sessionId}.jsonl`)
    try {
      return await readFile(path, 'utf-8')
    } catch {
      // try next
    }
  }
  throw new Error(`Session JSONL not found for ${sessionId}`)
}

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

// Get messages for a specific conversation (includes subagent steps)
claudeRoutes.get('/conversations/:id/messages', async (c) => {
  const sessionId = c.req.param('id')
  try {
    const raw = await readSessionJsonl(sessionId)
    const lines = raw
      .trim()
      .split('\n')
      .map((l) => JSON.parse(l))

    // Collect progress events grouped by parentToolUseID
    const progressByParent = new Map<string, any[]>()
    for (const line of lines) {
      if (line.type === 'progress' && line.parentToolUseID) {
        const arr = progressByParent.get(line.parentToolUseID) || []
        arr.push(line.data?.message)
        progressByParent.set(line.parentToolUseID, arr)
      }
    }

    // Build message list: top-level user/assistant + inline subagent steps
    const messages: any[] = []
    for (const line of lines) {
      if (line.type !== 'user' && line.type !== 'assistant') continue
      if (line.isSidechain) continue

      messages.push(line)

      // After an assistant message, check if it has Agent tool_use blocks
      if (line.type === 'assistant') {
        const content = line.message?.content
        if (!Array.isArray(content)) continue
        for (const block of content) {
          if (block.type === 'tool_use' && block.name === 'Agent') {
            const subSteps = progressByParent.get(block.id)
            if (subSteps) {
              for (const step of subSteps) {
                if (!step) continue
                messages.push({
                  type: step.type === 'user' ? 'user' : 'assistant',
                  message: step.message || step,
                  parent_tool_use_id: block.id,
                })
              }
            }
          }
        }
      }
    }

    return c.json(messages)
  } catch (e) {
    console.log(e)
    // Fallback to SDK method
    try {
      const messages = await getSessionMessages(sessionId, { dir: ROOT_DIR })
      return c.json(messages)
    } catch {
      return c.json([])
    }
  }
})
