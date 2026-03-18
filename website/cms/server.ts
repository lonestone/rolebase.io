import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from '@hono/node-server/serve-static'
import { treeRoutes } from './routes/tree.js'
import { fileRoutes } from './routes/file.js'
import { gitRoutes } from './routes/git.js'
import { claudeRoutes } from './routes/claude.js'
import { uploadRoutes } from './routes/upload.js'
import { componentsRoutes } from './routes/components.js'

const port = parseInt(process.env.CMS_PORT || '4001')
const contentDir = process.env.CONTENT_DIR || 'src/content'

const app = new Hono()

app.use('*', cors())

// API routes
app.route('/api/tree', treeRoutes)
app.route('/api/file', fileRoutes)
app.route('/api/git', gitRoutes)
app.route('/api/claude', claudeRoutes)
app.route('/api/upload', uploadRoutes)
app.route('/api/components', componentsRoutes)

// Serve content files (images, media) from the content directory
app.use('/content/*', serveStatic({ root: './' + contentDir, rewriteRequestPath: (path) => path.replace(/^\/content/, '') }))

// Serve CMS frontend (built files in cms/dist/)
app.use('/*', serveStatic({ root: './cms/dist' }))

// SPA fallback: serve index.html for all non-matched routes
app.get('*', serveStatic({ root: './cms/dist', path: 'index.html' }))

console.log(`CMS server running on http://localhost:${port}`)

serve({ fetch: app.fetch, port })
