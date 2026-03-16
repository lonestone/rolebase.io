import { createServer } from 'node:http'
import { spawn, execSync } from 'node:child_process'

// Resolve claude path at startup
let claudePath
try {
  claudePath = execSync('which claude', { encoding: 'utf8' }).trim()
  console.log(`Found claude at: ${claudePath}`)
} catch {
  console.error('claude CLI not found in PATH')
  process.exit(1)
}

const PORT = 4002
const PROMPT_PREFIX = 'In website: '

const server = createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.method === 'POST' && req.url === '/claude') {
    let body = ''
    req.on('data', (chunk) => (body += chunk))
    req.on('end', () => {
      let prompt
      try {
        prompt = JSON.parse(body).prompt
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Invalid JSON' }))
        return
      }

      if (!prompt || typeof prompt !== 'string') {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Missing prompt' }))
        return
      }

      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      })

      const fullPrompt = `${PROMPT_PREFIX}${prompt}`
      console.log(`Spawning: ${claudePath} -p <prompt of ${fullPrompt.length} chars>`)

      const claude = spawn(
        claudePath,
        [
          '--dangerously-skip-permissions',
          '--output-format', 'stream-json',
          '--verbose',
          '-p', fullPrompt,
        ],
        {
          cwd: process.cwd(),
          stdio: ['ignore', 'pipe', 'pipe'],
        }
      )

      const sendEvent = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`)
      }

      let jsonBuffer = ''
      claude.stdout.on('data', (chunk) => {
        jsonBuffer += chunk.toString()
        const lines = jsonBuffer.split('\n')
        jsonBuffer = lines.pop() || ''
        for (const line of lines) {
          if (!line.trim()) continue
          try {
            const event = JSON.parse(line)
            sendEvent(event)
          } catch {
            // ignore malformed lines
          }
        }
      })

      claude.stderr.on('data', (chunk) => {
        sendEvent({ type: 'stderr', text: chunk.toString() })
      })

      let killed = false

      claude.on('close', (code, signal) => {
        if (killed) return
        if (code === 0) {
          sendEvent({ text: '\n\n--- Done ---' })
        } else if (signal) {
          sendEvent({ text: `\n\n--- Killed by signal ${signal} ---` })
        } else {
          sendEvent({
            text: `\n\n--- Exited with code ${code}, signal ${signal} ---`,
          })
        }
        res.write('data: [DONE]\n\n')
        res.end()
      })

      claude.on('error', (err) => {
        sendEvent({ error: err.message })
        res.write('data: [DONE]\n\n')
        res.end()
      })

      // Handle client disconnect
      res.on('close', () => {
        if (!res.writableFinished) {
          killed = true
          claude.kill('SIGTERM')
        }
      })
    })
    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(PORT, () => {
  console.log(`Claude server listening on http://localhost:${PORT}`)
})
