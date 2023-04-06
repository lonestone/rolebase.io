import { ThreadFragment } from '@gql'
import { getEntityWithParticipantsRecipientIds } from '@utils/getEntityWithParticipantsRecipientIds'
import { getNotificationThreadData } from '@utils/notification/thread/getNotificationThreadData'
import { RouteError } from '@utils/route'

export async function threadInsertAction(
  senderUserId: string,
  thread: ThreadFragment
) {
  if (!thread.id) {
    throw new RouteError(404, 'No thread id provided')
  }
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
