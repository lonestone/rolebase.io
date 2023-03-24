import { getParticipantsByScope } from '@shared/helpers/getParticipantsByScope'
import { getOrgCirclesFullAndMembers } from '@utils/getOrgCirclesFullAndMembers'
import { RouteError } from '@utils/route'
import { getNotificationThreadActivityData } from './getNotificationThreadActivityData'

export async function threadActivityInsertAction(
  threadActivityId: string,
  senderUserId: string
) {
  // Get thread data
  const threadActivityDataResult = await getNotificationThreadActivityData(
    threadActivityId,
    senderUserId
  )

  if (!threadActivityDataResult.thread) {
    throw new RouteError(404, 'No thread found for this thread activity')
  }

  const { circleId, participantsScope, participantsMembersIds } =
    threadActivityDataResult.thread

  // Get thread org
  const org = await getOrgCirclesFullAndMembers(
    threadActivityDataResult.thread.orgId
  )
  if (!org) {
    throw new RouteError(404, 'Org not found')
  }

  // Get all recipients (by scope or extra) to send notification to
  const recipientIds = getParticipantsByScope(
    org.members,
    circleId,
    org.circles,
    participantsScope,
    participantsMembersIds
  ).map((participant) => participant.member.id)

  return recipientIds?.length
    ? {
        threadActivity: threadActivityDataResult,
        participantsIds: recipientIds,
      }
    : null
}
