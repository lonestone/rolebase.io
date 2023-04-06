import {
  MeetingFragment,
  TaskFragment,
  ThreadActivityFragment,
  ThreadFragment,
} from '@gql'
import { FunctionContext } from '@utils/getContext'
import { guardWebhookSecret } from '@utils/guardWebhookSecret'
import { HasuraEvent } from '@utils/nhost'
import { RouteError } from '@utils/route'

export function checkSendNotificationEvent<
  T = MeetingFragment | TaskFragment | ThreadFragment | ThreadActivityFragment
>(context: FunctionContext) {
  guardWebhookSecret(context)

  const fullEvent: HasuraEvent<T> = context.req.body
  if (!fullEvent || !fullEvent.event) {
    throw new RouteError(400, 'No event')
  }

  // Check sender
  const senderUserId = fullEvent.event.session_variables['x-hasura-user-id']
  if (!senderUserId) {
    throw new RouteError(401, 'Unauthorized')
  }

  // Check if new data (should always be provided in event)
  if (!fullEvent.event.data.new) {
    throw new RouteError(404, 'No new data')
  }

  return { fullEvent, senderUserId }
}
