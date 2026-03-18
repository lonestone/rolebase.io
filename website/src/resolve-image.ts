import type { ImageMetadata } from 'astro'

/**
 * A relative image path (e.g. `./image.png`) co-located with content.
 * Resolved at build time via `resolveContentImage()`.
 *
 * In the CMS component descriptor, this type is detected as `image`
 * and rendered with a file picker control.
 */
export type ImagePath = string

const images = import.meta.glob<{ default: ImageMetadata }>(
  './content/**/*.{png,jpg,jpeg,svg,webp}'
)

/**
 * Resolve a relative image path (e.g. `./logo.png`) to an Astro ImageMetadata.
 * Matches by filename against all images in `src/content/`.
 *
 * Pass `import.meta.url` as the second argument to disambiguate when
 * multiple content folders contain an image with the same filename.
 */
export async function resolveContentImage(
  path: string,
  callerUrl?: string
): Promise<ImageMetadata | undefined> {
  const filename = path.replace('./', '')
  const candidates = Object.entries(images).filter(([key]) =>
    key.endsWith(`/${filename}`)
  )
  if (candidates.length === 0) return undefined

  // If caller URL is provided, prefer a match in the same directory
  if (callerUrl && candidates.length > 1) {
    const callerDir = callerUrl.replace(/\/[^/]+$/, '')
    const local = candidates.find(([key]) => {
      const abs = new URL(key, callerUrl).href
      return abs.startsWith(callerDir)
    })
    if (local) return (await local[1]()).default
  }

  return (await candidates[0][1]()).default
}
