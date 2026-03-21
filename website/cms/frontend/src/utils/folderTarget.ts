import type { TreeNode } from '../api.js'

/**
 * Check if a directory node should act as a direct file link.
 * Returns the target file path, or null if the folder should behave normally.
 *
 * Cases:
 * - Folder contains only a single index file (index.mdx / index.md)
 * - Folder contains only files with 2-letter base names (locale files like en.mdx, fr.md)
 */
export function getFolderTarget(node: TreeNode): string | null {
  if (node.type !== 'directory' || !node.children) return null

  const mdxFiles = node.children.filter(
    (c) =>
      c.type === 'file' &&
      (c.name.endsWith('.mdx') || c.name.endsWith('.md'))
  )

  if (mdxFiles.length === 0) return null

  // Case 1: Only a single index file
  if (
    mdxFiles.length === 1 &&
    mdxFiles[0].name.replace(/\.mdx?$/, '') === 'index'
  ) {
    return mdxFiles[0].path
  }

  // Case 2: All files have 2-letter base names (locale files)
  const allLocale = mdxFiles.every((f) => {
    const base = f.name.replace(/\.mdx?$/, '')
    return base.length === 2
  })
  if (allLocale) {
    // Sort alphabetically so "en" comes before "fr"
    const sorted = [...mdxFiles].sort((a, b) => a.name.localeCompare(b.name))
    return sorted[0].path
  }

  return null
}

/**
 * Get locale siblings for a file path if it's inside a locale-only folder.
 * Returns an array of { lang, path } sorted alphabetically, or null.
 */
export function getLocaleSiblings(
  tree: TreeNode[],
  filePath: string
): { lang: string; path: string }[] | null {
  const parts = filePath.split('/')
  if (parts.length < 2) return null

  const parentPath = parts.slice(0, -1).join('/')
  const parentNode = findNode(tree, parentPath)
  if (!parentNode || !parentNode.children) return null

  const mdxFiles = parentNode.children.filter(
    (c) =>
      c.type === 'file' &&
      (c.name.endsWith('.mdx') || c.name.endsWith('.md'))
  )

  const allLocale = mdxFiles.every((f) => {
    const base = f.name.replace(/\.mdx?$/, '')
    return base.length === 2
  })

  if (!allLocale || mdxFiles.length < 2) return null

  return mdxFiles
    .map((f) => ({
      lang: f.name.replace(/\.mdx?$/, ''),
      path: f.path,
    }))
    .sort((a, b) => a.lang.localeCompare(b.lang))
}

function findNode(nodes: TreeNode[], path: string): TreeNode | null {
  for (const node of nodes) {
    if (node.path === path) return node
    if (node.children) {
      const found = findNode(node.children, path)
      if (found) return found
    }
  }
  return null
}
