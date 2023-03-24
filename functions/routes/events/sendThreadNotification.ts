import { Member_Role_Enum, ThreadFragment } from '@gql'
import { defaultLang, resources } from '@i18n'
import { guardOrg } from '@utils/guardOrg'
import { guardWebhookSecret } from '@utils/guardWebhookSecret'
import { HasuraEvent, HasuraEventOp } from '@utils/nhost'
import { getNotificationSenderAndRecipients } from '@utils/notification/getNotificationSenderAndRecipients'
import { NotificationThreadData } from '@utils/notification/thread/getNotificationThreadData'
import { threadInsertAction } from '@utils/notification/thread/threadInsertAction'
import { ThreadNotification } from '@utils/notification/thread/threadNotification'
import { threadUpdateAction } from '@utils/notification/thread/threadUpdateAction'
import { route, RouteError } from '@utils/route'

export default route(async (context): Promise<void> => {
  guardWebhookSecret(context)

  const event: HasuraEvent<ThreadFragment> = context.req.body

  if (!event) {
    throw new RouteError(400, 'No event')
  }

  // Sender
  const senderUserId = event.event.session_variables['x-hasura-user-id']
  if (!senderUserId) {
    throw new RouteError(401, 'Unauthorized')
  }

  // Check if new thread (should always be provided in event)
  if (!event.event.data.new) {
    throw new RouteError(404, 'No new thread')
  }

  // Check permission for new thread org
  await guardOrg(
    event.event.data.new.orgId,
    Member_Role_Enum.Member,
    senderUserId
  )

  // What needs to be done in each event case
  let threadActionReturn: {
    thread: NotificationThreadData
    participantsIds: string[]
  } | null = null
  switch (event.event.op) {
    case HasuraEventOp.INSERT:
      threadActionReturn = await threadInsertAction(
        senderUserId,
        event.event.data.new
      )
      break

    case HasuraEventOp.UPDATE:
      threadActionReturn = await threadUpdateAction(
        senderUserId,
        event.event.data.new,
        event.event.data.old
      )
      break

    default:
      break
  }

  // Don't send notification if no thread or participants
  if (!threadActionReturn?.thread || !threadActionReturn?.participantsIds) {
    return
  }

  // Get sender and recipients
  const { sender, recipients } = await getNotificationSenderAndRecipients(
    senderUserId,
    threadActionReturn.participantsIds
  )
  if (recipients.length === 0) {
    return
  }

  const locale = (sender?.locale as keyof typeof resources) || defaultLang
  const { org, orgId, id, title, circle } = threadActionReturn.thread

  // Build ThreadNotification instance for each recipient
  const notification = new ThreadNotification(locale, {
    org,
    orgId,
    threadId: id,
    title,
    role: circle.role.name,
  })
  // Send notification "thread"
  await notification.send(recipients)
})
