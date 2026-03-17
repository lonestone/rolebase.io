// Auto-discover all .astro components in this folder (recursively)
// These are made available to all MDX content via <Content components={mdxComponents} />
const modules = import.meta.glob('./**/*.astro', { eager: true })

export const mdxComponents: Record<string, any> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [
    path.split('/').pop()!.replace('.astro', ''),
    (mod as any).default,
  ])
)
