import { FastifyInstance } from 'fastify'
import { routes } from './registerRestRoutes'

export function registerRest(server: FastifyInstance) {
  server.register(async (app) => {
    app.addHook('onResponse', (request, reply, done) => {
      console.log(`[${reply.statusCode}] ${request.url}`)
      done()
    })

    for (const registerRoutes of routes) {
      registerRoutes(app)
    }
  })
}
