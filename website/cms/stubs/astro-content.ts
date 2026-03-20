/**
 * Stub for 'astro:content' used when loading content.config.ts outside of Astro.
 * Provides minimal implementations of defineCollection and glob.
 */
export function defineCollection(config: any) {
  return config
}

export function glob(_opts: any) {
  return {}
}
