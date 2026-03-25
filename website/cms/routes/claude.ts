import { Hono } from 'hono'
import { streamSSE } from 'hono/streaming'
import { spawn, type ChildProcess } from 'child_process'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import { homedir } from 'os'

export const claudeRoutes = new Hono()

// Get the Claude sessions directory for the current project
function getSessionsDir(): string {
  const cwd = process.cwd()
  const encoded = cwd.replace(/\//g, '-')
  return join(homedir(), '.claude', 'projects', encoded)
}

let activeProcess: ChildProcess | null = null

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

// Check Claude authentication status
claudeRoutes.get('/status', async (c) => {
  try {
    const result = await new Promise<{ authenticated: boolean; url?: string }>(
      (resolve) => {
        // Run a simple prompt to check if claude is authenticated
        const proc = spawn('claude', ['--output-format', 'json', '-p', 'hi'], {
          cwd: process.cwd(),
          stdio: ['pipe', 'pipe', 'pipe'],
        })

        let stderr = ''
        proc.stderr?.on('data', (data) => {
          stderr += data.toString()
        })

        // If it works, it's authenticated
        proc.on('close', (code) => {
          if (code === 0) {
            resolve({ authenticated: true })
          } else {
            // Try to extract auth URL from stderr
            const urlMatch = stderr.match(/(https:\/\/[^\s]+)/)
            resolve({
              authenticated: false,
              url: urlMatch?.[1],
            })
          }
        })

        // Timeout after 10s
        setTimeout(() => {
          proc.kill()
          resolve({ authenticated: false })
        }, 10000)
      }
    )

    return c.json(result)
  } catch {
    return c.json({ authenticated: false }, 500)
  }
})

// List recent conversations
claudeRoutes.get('/conversations', async (c) => {
  try {
    const sessionsDir = getSessionsDir()
    const files = await readdir(sessionsDir)
    const jsonlFiles = files.filter(
      (f) => f.endsWith('.jsonl') && !f.includes('/')
    )

    const conversations: {
      id: string
      firstMessage: string
      timestamp: string
      name?: string
    }[] = []

    for (const file of jsonlFiles) {
      const sessionId = file.replace('.jsonl', '')
      const filePath = join(sessionsDir, file)
      const content = await readFile(filePath, 'utf-8')
      const lines = content.split('\n').filter(Boolean)

      // Find the first user message to use as summary
      let firstMessage = ''
      let timestamp = ''
      let name: string | undefined

      for (const line of lines) {
        try {
          const event = JSON.parse(line)
          if (event.type === 'summary') {
            name = event.title || event.name
          }
          if (
            event.type === 'user' &&
            event.message?.role === 'user' &&
            !firstMessage
          ) {
            const content = event.message.content
            firstMessage =
              typeof content === 'string'
                ? content
                : Array.isArray(content)
                  ? content.find((b: any) => b.type === 'text')?.text || ''
                  : ''
            timestamp = event.timestamp || ''
          }
        } catch {
          // Skip malformed lines
        }
      }

      if (firstMessage) {
        conversations.push({
          id: sessionId,
          firstMessage: firstMessage.slice(0, 200),
          timestamp,
          name,
        })
      }
    }

    // Sort by timestamp descending
    conversations.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    return c.json(conversations.slice(0, 20))
  } catch {
    return c.json([])
  }
})

// Send a prompt to Claude and stream the response
claudeRoutes.post('/prompt', async (c) => {
  const body = await c.req.json<{ prompt: string; sessionId?: string }>()
  if (!body.prompt) {
    return c.json({ error: 'Missing prompt' }, 400)
  }

  // Kill any active process
  if (activeProcess) {
    activeProcess.kill()
    activeProcess = null
  }

  return streamSSE(c, async (stream) => {
    const args = [
      '--output-format',
      'stream-json',
      '--input-format',
      'stream-json',
      '--verbose',
      '--allowedTools',
      ...allowedTools,
    ]

    if (body.sessionId) {
      args.push('--resume', body.sessionId)
    }

    args.push('-p', body.prompt)

    const proc = spawn('claude', args, {
      cwd: process.cwd(),
      stdio: ['pipe', 'pipe', 'pipe'],
    })

    activeProcess = proc

    let buffer = ''

    proc.stdout?.on('data', (data) => {
      buffer += data.toString()

      // Parse complete JSON lines
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (!line.trim()) continue
        try {
          const event = JSON.parse(line)
          stream.writeSSE({ data: JSON.stringify(event) })
        } catch {
          // Incomplete JSON, skip
        }
      }
    })

    proc.stderr?.on('data', (data) => {
      stream.writeSSE({
        event: 'error',
        data: JSON.stringify({ error: data.toString() }),
      })
    })

    await new Promise<void>((resolve) => {
      proc.on('close', (code) => {
        stream.writeSSE({
          event: 'done',
          data: JSON.stringify({ code }),
        })
        activeProcess = null
        resolve()
      })
    })

    // Handle client disconnect
    stream.onAbort(() => {
      if (activeProcess === proc) {
        proc.kill()
        activeProcess = null
      }
    })
  })
})

// Respond to a permission request
claudeRoutes.post('/permission', async (c) => {
  if (!activeProcess?.stdin?.writable) {
    return c.json({ ok: false, message: 'No active process' }, 400)
  }

  const body = await c.req.json<{
    requestId: string
    behavior: 'allow' | 'deny'
    updatedInput?: Record<string, unknown>
  }>()

  const response: Record<string, unknown> = {
    type: 'permission_response',
    permission_response: {
      permission: body.behavior === 'allow' ? 'allow' : 'deny',
      request_id: body.requestId,
    },
  }

  activeProcess.stdin.write(JSON.stringify(response) + '\n')
  return c.json({ ok: true })
})

// Stop the active Claude process
claudeRoutes.post('/stop', async (c) => {
  if (activeProcess) {
    activeProcess.kill()
    activeProcess = null
    return c.json({ ok: true })
  }
  return c.json({ ok: false, message: 'No active process' })
})
