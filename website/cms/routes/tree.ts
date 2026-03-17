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

async function buildTree(dir: string, basePath: string): Promise<TreeNode[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const nodes: TreeNode[] = []

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const fullPath = join(dir, entry.name)
    const relPath = relative(process.cwd(), fullPath)

    if (entry.isDirectory()) {
      const children = await buildTree(fullPath, basePath)
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
  const tree = await buildTree(join(process.cwd(), contentDir), contentDir)
  return c.json(tree)
})
