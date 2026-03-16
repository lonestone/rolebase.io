import { createServer } from 'node:http'
import { spawn } from 'node:child_process'

const PORT = 4002

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

      const claude = spawn(
        'claude',
        ['--dangerously-skip-permissions', '-p', prompt],
        {
          cwd: process.cwd(),
          env: { ...process.env },
          stdio: ['ignore', 'pipe', 'pipe'],
        }
      )

      const sendEvent = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`)
      }

      claude.stdout.on('data', (chunk) => {
        sendEvent({ text: chunk.toString() })
      })

      claude.stderr.on('data', (chunk) => {
        sendEvent({ text: chunk.toString() })
      })

      claude.on('close', (code) => {
        sendEvent({
          text: code === 0 ? '\n\n--- Done ---' : `\n\n--- Exited with code ${code} ---`,
        })
        res.write('data: [DONE]\n\n')
        res.end()
      })

      claude.on('error', (err) => {
        sendEvent({ error: err.message })
        res.write('data: [DONE]\n\n')
        res.end()
      })

      // Handle client disconnect
      req.on('close', () => {
        claude.kill('SIGTERM')
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
