import { ThreadFragment } from '@gql'
import { getEntityWithParticipantsRecipientIds } from '@utils/getEntityWithParticipantsRecipientIds'
import { getNotificationThreadData } from '@utils/notification/thread/getNotificationThreadData'

export async function threadInsertAction(
  senderUserId: string,
  thread: ThreadFragment
) {
  // Get thread data
  const threadDataResult = await getNotificationThreadData(
    thread.id,
    senderUserId
  )

  // Get all recipients (by scope or extra) to send notification to
  const recipientIds = await getEntityWithParticipantsRecipientIds(
    threadDataResult
  )

  return recipientIds?.length
    ? {
        thread: threadDataResult,
        participantsIds: recipientIds,
      }
    : null
}
