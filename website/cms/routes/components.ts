import { Hono } from 'hono'
import { readdir } from 'fs/promises'
import { join } from 'path'

const COMPONENTS_DIR = join(process.cwd(), 'src/components')

export const componentsRoutes = new Hono()

// GET /api/components — list available MDX components (recursive)
componentsRoutes.get('/', async (c) => {
  const components: string[] = []
  async function scan(dir: string) {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        await scan(join(dir, entry.name))
      } else if (entry.name.endsWith('.astro')) {
        components.push(entry.name.replace('.astro', ''))
      }
    }
  }
  await scan(COMPONENTS_DIR)
  components.sort()
  return c.json(components)
})
