import { Hono } from 'hono'
import { streamText, convertToModelMessages } from 'ai'
import { claudeCode } from 'ai-sdk-provider-claude-code'
import { listSessions, getSessionMessages } from '@anthropic-ai/claude-agent-sdk'
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
