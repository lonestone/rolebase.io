import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { redirects } from './src/redirects'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://rolebase.io',
  adapter: netlify({ imageCDN: true }),
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  redirects,
  integrations: [mdx(), sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
})
