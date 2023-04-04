import react from '@vitejs/plugin-react'
import path from 'path'
import { terser } from 'rollup-plugin-terser'
import visualizer from 'rollup-plugin-visualizer'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr({ exportAsDefault: true }),
    react(),
    tsconfigPaths(),
    VitePWA({
      includeAssets: ['/icons/*'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'Rolebase',
        short_name: 'Rolebase',
        description:
          'A tool that makes your organization clear and participatory',
        theme_color: '#FBF7FC',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: '/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: '/icons/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: '/icons/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        importScripts: ['/public/firebase-messaging-sw.js'],
        navigateFallbackAllowlist: [/^index.html$/],
        navigateFallbackDenylist: [
          /^\/functions/,
          /^\/nhost/,
          /^\/patches/,
          /^\/docs/,
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallbackAllowlist: [/^index.html$/],
      },
    }),
    terser({
      format: {
        comments: false,
      },
      compress: false,
    }),
    visualizer(),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      // Multiple entry points: https://stackoverflow.com/questions/70522494/multiple-entry-points-in-vite
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        demo1: fileURLToPath(
          new URL('./src/demos/demo1.html', import.meta.url)
        ),
      },
    },
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      {
        // Prevent yjs from being imported twice (from its CommonJS and ECMAScript version), by forcing an alias on it
        // More info: https://github.com/yjs/yjs/issues/438
        find: 'yjs',
        replacement: path.resolve(__dirname, './node_modules/yjs/dist/yjs.mjs'),
      },
    ],
  },
})
