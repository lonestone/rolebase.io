import { Hono } from 'hono'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export const uploadRoutes = new Hono()

// Upload a media file to the content directory
uploadRoutes.post('/', async (c) => {
  const formData = await c.req.formData()
  const file = formData.get('file') as File | null
  const targetDir = formData.get('targetDir') as string | null

  if (!file || !targetDir) {
    return c.json({ error: 'Missing file or targetDir' }, 400)
  }

  if (targetDir.includes('..')) {
    return c.json({ error: 'Invalid path' }, 400)
  }

  const fullDir = join(process.cwd(), targetDir)
  await mkdir(fullDir, { recursive: true })

  const filePath = join(fullDir, file.name)
  const relPath = join(targetDir, file.name)

  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(filePath, buffer)

  return c.json({ ok: true, path: relPath, name: file.name })
})
