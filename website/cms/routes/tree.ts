import { Hono } from 'hono'
import { readdir } from 'fs/promises'
import { join, relative } from 'path'

const contentDir = process.env.CONTENT_DIR || 'src/content'

interface TreeNode {
  name: string
  path: string
  type: 'file' | 'directory'
  children?: TreeNode[]
}

const contentRoot = join(process.cwd(), contentDir)

async function buildTree(dir: string): Promise<TreeNode[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const nodes: TreeNode[] = []

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const fullPath = join(dir, entry.name)
    const relPath = relative(contentRoot, fullPath)

    if (entry.isDirectory()) {
      const children = await buildTree(fullPath)
      nodes.push({
        name: entry.name,
        path: relPath,
        type: 'directory',
        children,
      })
    } else {
      nodes.push({
        name: entry.name,
        path: relPath,
        type: 'file',
      })
    }
  }

  return nodes
}

export const treeRoutes = new Hono()

treeRoutes.get('/', async (c) => {
  const tree = await buildTree(contentRoot)
  return c.json(tree)
})
