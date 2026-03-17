import { Hono } from 'hono'
import { streamSSE } from 'hono/streaming'
import { spawn, type ChildProcess } from 'child_process'

export const claudeRoutes = new Hono()

let activeProcess: ChildProcess | null = null

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

// Send a prompt to Claude and stream the response
claudeRoutes.post('/prompt', async (c) => {
  const body = await c.req.json<{ prompt: string }>()
  if (!body.prompt) {
    return c.json({ error: 'Missing prompt' }, 400)
  }

  // Kill any active process
  if (activeProcess) {
    activeProcess.kill()
    activeProcess = null
  }

  return streamSSE(c, async (stream) => {
    const proc = spawn(
      'claude',
      [
        '--dangerously-skip-permissions',
        '--output-format',
        'stream-json',
        '--verbose',
        '-p',
        body.prompt,
      ],
      {
        cwd: process.cwd(),
        stdio: ['pipe', 'pipe', 'pipe'],
      }
    )

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

// Stop the active Claude process
claudeRoutes.post('/stop', async (c) => {
  if (activeProcess) {
    activeProcess.kill()
    activeProcess = null
    return c.json({ ok: true })
  }
  return c.json({ ok: false, message: 'No active process' })
})
