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
  let siteUrl = ''
  return {
    name: 'enrich-md',
    hooks: {
      'astro:config:done': ({ config }) => {
        siteUrl = config.site?.replace(/\/$/, '') || ''
      },
      'astro:build:done': ({ dir }) => {
        const distDir = fileURLToPath(dir)
        const htmlFiles = globSync('**/*.html', { cwd: distDir })

        let generated = 0
        const mdPages: Array<{ urlPath: string; mdUrlPath: string }> = []

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

          const urlPath = slug ? `/${slug}` : '/'
          const mdUrlPath = slug ? `/${slug}.md` : '/index.md'
          mdPages.push({ urlPath, mdUrlPath })
        }

        // Write Netlify _headers: Link headers advertising the .md alternate
        // (RFC 8288) for each page, plus explicit Content-Type for .md files
        // served directly.
        const sections: string[] = [
          '/*.md\n  Content-Type: text/markdown; charset=utf-8',
        ]
        for (const { urlPath, mdUrlPath } of mdPages) {
          sections.push(
            `${urlPath}\n  Link: <${mdUrlPath}>; rel="alternate"; type="text/markdown"`
          )
        }
        writeFileSync(join(distDir, '_headers'), sections.join('\n\n') + '\n')

        console.log(
          `Generated ${generated} .md files and _headers with ${mdPages.length} entries`
        )
      },
    },
  }
}
