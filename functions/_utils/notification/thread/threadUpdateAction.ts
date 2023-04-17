import { ThreadFragment } from '@gql'
import { getParticipantIdsDiff } from '@utils/getParticipantIdsDiff'
import { RouteError } from '@utils/route'
import { getNotificationThreadData } from '@utils/notification/thread/getNotificationThreadData'

export async function threadUpdateAction(
  senderUserId: string,
  newThread: ThreadFragment,
  oldThread: ThreadFragment | null
) {
  if (!oldThread) {
    throw new RouteError(404, 'Bad request')
  }

  // Get diff in thread participants
  const newParticipantIds = await getParticipantIdsDiff(oldThread, newThread)
  if (!newParticipantIds || newParticipantIds.length === 0) {
    return null
  }

  // Send notification
  // If changes on participants : send thread notification only to new participants
  const thread = await getNotificationThreadData(newThread.id, senderUserId)

  return { thread, participantsIds: newParticipantIds }
}
