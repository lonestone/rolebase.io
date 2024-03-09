import { TRPCError } from '@trpc/server'
import { Context } from '../../src/context'

export function guardAdmin(context: Context) {
  if (!context.isAdmin) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
}
