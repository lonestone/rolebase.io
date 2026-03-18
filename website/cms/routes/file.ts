import { Hono } from 'hono'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'

const contentDir = process.env.CONTENT_DIR || 'src/content'

export const fileRoutes = new Hono()

// Read a file (path is relative to CONTENT_DIR)
fileRoutes.get('/', async (c) => {
  const filePath = c.req.query('path')
  if (!filePath) {
    return c.json({ error: 'Missing path parameter' }, 400)
  }

  if (filePath.includes('..')) {
    return c.json({ error: 'Invalid path' }, 400)
  }

  try {
    const fullPath = join(process.cwd(), contentDir, filePath)
    const content = await readFile(fullPath, 'utf-8')
    return c.json({ path: filePath, content })
  } catch {
    return c.json({ error: 'File not found' }, 404)
  }
})

// Write a file (path is relative to CONTENT_DIR)
fileRoutes.post('/', async (c) => {
  const body = await c.req.json<{ path: string; content: string }>()
  if (!body.path || body.content === undefined) {
    return c.json({ error: 'Missing path or content' }, 400)
  }

  if (body.path.includes('..')) {
    return c.json({ error: 'Invalid path' }, 400)
  }

  try {
    const fullPath = join(process.cwd(), contentDir, body.path)
    await mkdir(dirname(fullPath), { recursive: true })
    await writeFile(fullPath, body.content, 'utf-8')
    return c.json({ ok: true, path: body.path })
  } catch (err) {
    return c.json({ error: String(err) }, 500)
  }
})
