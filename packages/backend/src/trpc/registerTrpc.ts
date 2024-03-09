import { TRPCError } from '@trpc/server'
import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify'
import { FastifyInstance } from 'fastify'
import { TrpcRouter, trpcRouter } from '../features'
import { createContext } from './context'

export function registerTrpc(app: FastifyInstance) {
  app.register(fastifyTRPCPlugin, {
    prefix: '',
    trpcOptions: {
      router: trpcRouter,
      createContext,
      onError({ path, error }) {
        if (
          !(error instanceof TRPCError) ||
          error.code === 'INTERNAL_SERVER_ERROR'
        ) {
          console.error(`[Error] ${path}:`, error)
        }
      },
    } satisfies FastifyTRPCPluginOptions<TrpcRouter>['trpcOptions'],
  })
}
