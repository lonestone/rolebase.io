import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'
import { redirects } from './src/redirects'
import rehypeMdClass from './src/rehype-md-class'
import enrichMd from './src/integrations/enrich-md'
import config from './website.config'

const { site, langs, defaultLang } = config

export default defineConfig({
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
        defaultLocale: defaultLang,
        locales: Object.fromEntries(langs.map((l) => [l, l])),
      },
    }),
    enrichMd(),
  ],
  i18n: {
    defaultLocale: defaultLang,
    locales: [...langs],
    routing: {
      prefixDefaultLocale: true,
    },
  },
})
