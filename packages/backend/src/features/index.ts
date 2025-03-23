import { publicProcedure, router } from '../trpc'
import ai from './ai'
import apps from './apps'
import cron from './cron'
import './graphql'
import meeting from './meeting'
import member from './member'
import org from './org'
import orgSubscription from './orgSubscription'
import participants from './participants'
import search from './search'
import trigger from './trigger'

export const trpcRouter = router({
  ai,
  apps,
  cron,
  meeting,
  member,
  org,
  orgSubscription,
  participants,
  search,
  trigger,

  // Health check for Nhost
  healthz: publicProcedure.query(() => 'ok'),
})

export type TrpcRouter = typeof trpcRouter
