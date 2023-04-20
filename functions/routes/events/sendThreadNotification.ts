import { ThreadFragment } from '@gql'
import { defaultLang, resources } from '@i18n'
import { HasuraEventOp } from '@utils/nhost'
import { checkSendNotificationEvent } from '@utils/notification/checkSendNotificationEvent'
import { getNotificationSenderAndRecipients } from '@utils/notification/getNotificationSenderAndRecipients'
import { NotificationThreadData } from '@utils/notification/thread/getNotificationThreadData'
import { threadInsertAction } from '@utils/notification/thread/threadInsertAction'
import { ThreadNotification } from '@utils/notification/thread/threadNotification'
import { threadUpdateAction } from '@utils/notification/thread/threadUpdateAction'
import { route } from '@utils/route'

export default route(async (context): Promise<void> => {
  const {
    eventBody: {
      event: { op },
    },
    newEntity,
    oldEntity,
    senderUserId,
  } = checkSendNotificationEvent<ThreadFragment>(context)

  // What needs to be done in each event case
  let threadActionReturn: {
    thread: NotificationThreadData
    participantsIds: string[]
  } | null = null
  switch (op) {
    // Done if a new thread is inserted in DB
    case HasuraEventOp.INSERT:
      threadActionReturn = await threadInsertAction(senderUserId, newEntity)
      break

    // Done if there is an update for some fields of a thread in DB
    case HasuraEventOp.UPDATE:
      threadActionReturn = await threadUpdateAction(
        senderUserId,
        newEntity,
        oldEntity
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
