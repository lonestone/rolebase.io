/**
 * Resolve a relative image source path to a preview URL served by the CMS.
 *
 * - `./image.png` or `image.png` → `/content/{dir}/image.png`
 * - `../../../assets/images/foo.png` → resolved and served from `/assets/`
 * - Absolute or http URLs are returned as-is.
 */
export function resolvePreviewSrc(
  src: string,
  filePath: string
): string | undefined {
  if (!src) return undefined
  if (src.startsWith('/') || src.startsWith('http')) return src

  const dir = filePath.replace(/\/[^/]+$/, '')
  const name = src.replace(/^\.\//, '')
  // Build the full path under content/ and resolve . and .. segments
  const parts = `content/${dir}/${name}`.split('/')
  const resolved: string[] = []
  for (const part of parts) {
    if (part === '.' || part === '') continue
    if (part === '..') {
      resolved.pop()
    } else {
      resolved.push(part)
    }
  }

  const resolvedPath = resolved.join('/')

  // If the path still starts with "content/", serve from /content/
  if (resolvedPath.startsWith('content/')) {
    return `/${resolvedPath}`
  }

  // If it resolved to assets/, serve from /assets/
  if (resolvedPath.startsWith('assets/')) {
    return `/${resolvedPath}`
  }

  // Path escaped to an unsupported directory
  return undefined
}
