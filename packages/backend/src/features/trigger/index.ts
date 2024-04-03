import { TRPCError } from '@trpc/server'
import { webhookProcedure } from '../../trpc/webhookProcedure'
import { HasuraEvent } from '../../utils/nhost'
import { indexTables } from './entities'

export default webhookProcedure.mutation(async (opts) => {
  const event = JSON.parse(opts.ctx.req.body as string) as HasuraEvent

  if (!event || !event.table) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: `No event provided` })
  }

  const table = `${event.table.schema}.${event.table.name}`

  // Find the class that handles this table
  const IndexTable = indexTables.find((i) => i.table === table)
  if (!IndexTable) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `No support for table ${table}`,
    })
  }

  // Apply event with specific table config
  await new IndexTable().applyEvent(event)
})
