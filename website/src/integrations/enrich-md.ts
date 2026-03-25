import type { AstroIntegration } from 'astro'
import { readFileSync, writeFileSync } from 'fs'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'
import { globSync } from 'glob'
import TurndownService from 'turndown'

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
})
turndown.remove([
  'svg',
  'video',
  'picture',
  'script',
  'style',
  'noscript',
  'iframe',
])

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

/**
 * Astro integration that generates .md files from rendered HTML pages.
 * Extracts title and description from <head>, content from <main>.
 */
export default function enrichMd(): AstroIntegration {
  return {
    name: 'enrich-md',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const distDir = fileURLToPath(dir)
        const htmlFiles = globSync('**/*.html', { cwd: distDir })
        const siteUrl = 'https://www.rolebase.io'

        let generated = 0

        for (const htmlFile of htmlFiles) {
          const htmlPath = join(distDir, htmlFile)
          const html = readFileSync(htmlPath, 'utf-8')

          // Skip redirect pages (no <main>)
          const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)
          if (!mainMatch) continue

          // Extract metadata from <head>
          const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/)
          const descMatch = html.match(
            /<meta\s+name="description"\s+content="([^"]*)"/
          )
          const title = titleMatch?.[1]?.trim()
          if (!title) continue
          const description = descMatch?.[1]
            ? decodeHtmlEntities(descMatch[1])
            : undefined

          // Convert body
          const body = turndown.turndown(mainMatch[1]).trim()
          if (!body) continue

          // Build URL from file path
          const slug = relative(distDir, htmlPath)
            .replace(/\.html$/, '')
            .replace(/\/index$/, '')
          const url = slug ? `${siteUrl}/${slug}` : `${siteUrl}/`

          // Build frontmatter
          const fm = [
            '---',
            `title: ${JSON.stringify(decodeHtmlEntities(title))}`,
            ...(description
              ? [`description: ${JSON.stringify(description)}`]
              : []),
            `url: ${JSON.stringify(url)}`,
            '---',
          ].join('\n')

          const mdPath = htmlPath.replace(/\.html$/, '.md')
          writeFileSync(mdPath, `${fm}\n\n${body}\n`)
          generated++
        }

        console.log(`Generated ${generated} .md files from HTML`)
      },
    },
  }
}
