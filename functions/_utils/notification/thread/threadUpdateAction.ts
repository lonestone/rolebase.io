import { Member_Role_Enum, ThreadFragment } from '@gql'
import { getParticipantIdsDiff } from '@utils/getParticipantIdsDiff'
import { guardOrg } from '@utils/guardOrg'
import { RouteError } from '@utils/route'
import { getNotificationThreadData } from './getNotificationThreadData'

export async function threadUpdateAction(
  senderUserId: string,
  newThread: ThreadFragment,
  oldThread: ThreadFragment | null
) {
  if (!oldThread) {
    throw new RouteError(404, 'Bad request')
  }

  //  Check permission for old thread org
  await guardOrg(oldThread.orgId, Member_Role_Enum.Member, senderUserId)

  // Get diff in thread participants
  const newParticipantIds = await getParticipantIdsDiff<ThreadFragment>(
    oldThread,
    newThread
  )
  if (!newParticipantIds || newParticipantIds.length === 0) {
    return null
  }

  // Send notification
  // If changes on participants : send thread notification only to new participants
  const thread = await getNotificationThreadData(newThread.id!, senderUserId)

  return { thread, participantsIds: newParticipantIds }
}
