import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { redirects } from './src/redirects'
import rehypeMdClass from './src/rehype-md-class'
import enrichMd from './src/integrations/enrich-md'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://rolebase.io',
  adapter: netlify({ imageCDN: true, edgeMiddleware: false }),
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  redirects,
  markdown: {
    rehypePlugins: [rehypeMdClass],
  },
  integrations: [mdx(), sitemap(), enrichMd()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
})
