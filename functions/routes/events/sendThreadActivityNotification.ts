import { ThreadActivityFragment } from '@gql'
import { defaultLang, resources } from '@i18n'
import { checkSendNotificationEvent } from '@utils/notification/checkSendNotificationEvent'
import { HasuraEventOp } from '@utils/nhost'
import { getNotificationSenderAndRecipients } from '@utils/notification/getNotificationSenderAndRecipients'
import { threadActivityInsertAction } from '@utils/notification/thread/threadActivityInsertAction'
import { ThreadActivityNotification } from '@utils/notification/thread/threadActivityNotification'
import { route, RouteError } from '@utils/route'

export default route(async (context): Promise<void> => {
  const {
    eventBody: {
      event: { op },
    },
    newEntity,
    senderUserId,
  } = checkSendNotificationEvent<ThreadActivityFragment>(context)

  // Currently we just send notification when a new thread is inserted in DB
  if (op !== HasuraEventOp.INSERT) {
    return
  }

  // Check if new thread activity id
  if (!newEntity.id) {
    throw new RouteError(404, 'No new thread activity')
  }
  // What needs to be done
  const threadActivityActionReturn = await threadActivityInsertAction(
    newEntity.id
  )

  // Don't send notification if no thread activity or participants
  if (
    !threadActivityActionReturn?.threadActivity.thread ||
    !threadActivityActionReturn?.participantsIds
  ) {
    return
  }

  // Get sender and recipients
  const { sender, recipients } = await getNotificationSenderAndRecipients(
    senderUserId,
    threadActivityActionReturn.participantsIds
  )
  if (recipients.length === 0) {
    return
  }

  const locale = (sender?.locale as keyof typeof resources) || defaultLang

  const { org, orgId, id, title, circle } =
    threadActivityActionReturn.threadActivity.thread

  // Build ThreadActivityNotification instance for each recipient
  const notification = new ThreadActivityNotification(locale, {
    org,
    orgId,
    threadId: id,
    title,
    role: circle.role.name,
  })
  // Send notification "threadactivity"
  await notification.send(recipients)
})
