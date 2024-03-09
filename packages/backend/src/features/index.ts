import { publicProcedure, router } from '../trpc'
import ai from './ai'
import meeting from './meeting'
import search from './search'

export const backendRouter = router({
  meeting,
  search,
  ai,

  // Health check for Nhost
  healthz: publicProcedure.query(() => 'ok'),
})

export type BackendRouter = typeof backendRouter
