import { ThreadFragment } from '@gql'
import { getParticipantsByScope } from '@shared/helpers/getParticipantsByScope'
import { getOrgCirclesFullAndMembers } from '@utils/getOrgCirclesFullAndMembers'
import { RouteError } from '@utils/route'
import { getNotificationThreadData } from './getNotificationThreadData'

export async function threadInsertAction(
  senderUserId: string,
  thread: ThreadFragment
) {
  // Get thread data
  const threadDataResult = await getNotificationThreadData(
    thread.id,
    senderUserId
  )

  // Get thread org
  const org = await getOrgCirclesFullAndMembers(thread.orgId)
  if (!org) {
    throw new RouteError(404, 'Org not found')
  }

  // Get all recipients (by scope or extra) to send notification to
  const recipientIds = getParticipantsByScope(
    org.members,
    threadDataResult.circleId,
    org.circles,
    threadDataResult.participantsScope,
    threadDataResult.participantsMembersIds
  ).map((participant) => participant.member.id)

  return recipientIds?.length
    ? {
        thread: threadDataResult,
        participantsIds: recipientIds,
      }
    : null
}
