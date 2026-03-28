import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { redirects } from './src/redirects'
import rehypeMdClass from './src/rehype-md-class'
import enrichMd from './src/integrations/enrich-md'

const site = 'https://rolebase.io'
const defaultLocale = 'en'
const locales = ['en', 'fr']

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site,
  adapter: netlify({ imageCDN: true, edgeMiddleware: false }),
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  redirects,
  markdown: {
    rehypePlugins: [rehypeMdClass],
  },
  integrations: [
    mdx(),
    sitemap({
      // Exclude root URL (redirects to /en/) to avoid duplicate hreflang entries
      filter: (page) => page !== `${site}/`,
      i18n: {
        defaultLocale,
        locales: Object.fromEntries(locales.map((l) => [l, l])),
      },
    }),
    enrichMd(),
  ],
  i18n: {
    defaultLocale,
    locales,
    routing: {
      prefixDefaultLocale: true,
    },
  },
})
