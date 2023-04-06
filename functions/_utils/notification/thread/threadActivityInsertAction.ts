import { RouteError } from '@utils/route'
import { getNotificationThreadActivityData } from '@utils/notification/thread/getNotificationThreadActivityData'
import { getEntityWithParticipantsRecipientIds } from '@utils/getEntityWithParticipantsRecipientIds'

export async function threadActivityInsertAction(threadActivityId: string) {
  // Get thread data
  const threadActivityDataResult = await getNotificationThreadActivityData(
    threadActivityId
  )

  if (!threadActivityDataResult.thread) {
    throw new RouteError(404, 'No thread found for this thread activity')
  }

  // Get all recipients (by scope or extra) to send notification to
  const recipientIds = await getEntityWithParticipantsRecipientIds(
    threadActivityDataResult.thread
  )

  return recipientIds?.length
    ? {
        threadActivity: threadActivityDataResult,
        participantsIds: recipientIds,
      }
    : null
}
