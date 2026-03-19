import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 4002,
    proxy: {
      '/api': 'http://localhost:4001',
      '/content': 'http://localhost:4001',
      '/assets': 'http://localhost:4001',
    },
  },
})
