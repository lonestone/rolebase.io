import { FastifyInstance } from 'fastify'

export type RestRouteRegister = (server: FastifyInstance) => void

export const routes: RestRouteRegister[] = []

export function registerRestRoutes(register: RestRouteRegister) {
  routes.push(register)
}
