import { TRPCError } from '@trpc/server'
import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify'
import fastify from 'fastify'
import { createContext } from './context'
import { BackendRouter, backendRouter } from './features'
import settings from './settings'

// Create Fastify server
const server = fastify()

// Add pre-handler hook for CORS
server.addHook('preHandler', async (req, res) => {
  // Set default headers
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')

  // Enable CORS for OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(204).send()
    return
  }
})

// Register tRPC plugin
server.register(fastifyTRPCPlugin, {
  prefix: '',
  trpcOptions: {
    router: backendRouter,
    createContext,
    onError({ path, error }) {
      if (!(error instanceof TRPCError)) {
        console.error(`[Error] ${path}:`, error)
      }
    },
  } satisfies FastifyTRPCPluginOptions<BackendRouter>['trpcOptions'],
})

// Start server
server
  .listen({
    port: settings.port,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`Listening to port ${settings.port}`)
  })
  .catch((err) => {
    server.log.error(err)
    process.exit(1)
  })
