import { indexTables } from '@search/index'
import { guardWebhookSecret } from '@utils/guardWebhookSecret'
import { HasuraEvent } from '@utils/nhost'
import { route, RouteError } from '@utils/route'

export default route(async (context): Promise<void> => {
  guardWebhookSecret(context)

  const event: HasuraEvent = context.req.body
  const table = `${event.table.schema}.${event.table.name}`

  // Find the class that handles this table
  const IndexTable = indexTables.find((i) => i.table === table)
  if (!IndexTable) {
    throw new RouteError(400, `No index for table ${table}`)
  }

  // Apply event with specific table config
  new IndexTable().applyEvent(event)
})
