import { publicProcedure } from '.'
import { guardAdmin } from '../guards/guardAdmin'

export const adminProcedure = publicProcedure.use((opts) => {
  guardAdmin(opts.ctx)
  return opts.next()
})
