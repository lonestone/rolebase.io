import { FunctionContext } from '@utils/getContext'
import { guardWebhookSecret } from '@utils/guardWebhookSecret'
import { HasuraEvent } from '@utils/nhost'
import { RouteError } from '@utils/route'

export function checkSendNotificationEvent<T>(context: FunctionContext) {
  guardWebhookSecret(context)

  const eventBody: HasuraEvent<T> = context.req.body
  if (!eventBody || !eventBody.event) {
    throw new RouteError(400, 'No event')
  }

  // Check sender
  const senderUserId = eventBody.event.session_variables['x-hasura-user-id']
  if (!senderUserId) {
    throw new RouteError(401, 'Unauthorized')
  }

  const newEntity = eventBody.event.data.new
  const oldEntity = eventBody.event.data.old
  // Check if new data (should always be provided in event)
  if (!newEntity) {
    throw new RouteError(404, 'No new data')
  }

  return { eventBody, newEntity, oldEntity, senderUserId }
}
