import { TRPCError } from '@trpc/server'
import { Context } from '../../src/context'

export function guardAuth(context: Context) {
  if (!context.isAuthenticated) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return context.userId!
}
