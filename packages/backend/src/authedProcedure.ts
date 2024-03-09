import { publicProcedure } from './trpc'
import { guardAuth } from './utils/guardAuth'

export const authedProcedure = publicProcedure.use((opts) => {
  guardAuth(opts.ctx)
  return opts.next()
})
