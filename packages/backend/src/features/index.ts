import { publicProcedure, router } from '../trpc'
import ai from './ai'
import apps from './apps'
import meeting from './meeting'
import participants from './participants'
import search from './search'
import trigger from './trigger'

export const trpcRouter = router({
  ai,
  apps,
  meeting,
  participants,
  search,
  trigger,

  // Health check for Nhost
  healthz: publicProcedure.query(() => 'ok'),
})

export type TrpcRouter = typeof trpcRouter
