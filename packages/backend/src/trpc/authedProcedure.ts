import { publicProcedure } from '.'
import { guardAuth } from '../guards/guardAuth'

export const authedProcedure = publicProcedure.use((opts) => {
  guardAuth(opts.ctx)
  return opts.next()
})
