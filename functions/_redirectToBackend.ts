import * as dotenv from 'dotenv'
import { Request, Response } from 'express'
dotenv.config()

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// Redirect to same path on backend
export function redirectToBackend(path: string) {
  return async (req: Request, res: Response) => {
    const url = new URL(
      path +
        // Query string
        req.url.replace(/[^\?]*(?=\?)/, ''),
      process.env.BACKEND_URL
    ).toString()

    console.log('url', url)
    const reqHeaders: Record<string, string> = {}
    for (const header in req.headers) {
      if (/^x-goog-/.test(header)) {
        reqHeaders[header] = req.headers[header] as string
      }
    }
    console.log('reqHeaders', reqHeaders)

    const response = await fetch(url, {
      method: req.method,
      headers: reqHeaders,
      // body: req.method === 'POST' ? req.body : undefined,
    })

    console.log('status', response.status)
    // console.log('data', await response.text())

    for (const header of response.headers) {
      res.header(header[0], header[1])
    }

    const body = await response.text()

    // Send status and body to client
    res.status(response.status).send(body)
  }
}
