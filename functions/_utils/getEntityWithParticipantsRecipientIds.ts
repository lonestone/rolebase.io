import { EntityWithParticipants } from '@shared/model/participants'
import { getParticipantsByScope } from '@shared/helpers/getParticipantsByScope'
import { getOrgCirclesFullAndMembers } from '@utils/getOrgCirclesFullAndMembers'
import { RouteError } from '@utils/route'

export async function getEntityWithParticipantsRecipientIds(
  entity: EntityWithParticipants & { orgId: string }
) {
  if (!entity) {
    throw new RouteError(400, 'Bad request')
  }

  const { orgId, circleId, participantsScope, participantsMembersIds } = entity

  // Get entity org circles and members
  const { circles, members } = await getOrgCirclesFullAndMembers(orgId)

  // Get all recipients (by scope or extra)
  const recipientIds = getParticipantsByScope(
    members,
    circleId,
    circles,
    participantsScope,
    participantsMembersIds
  ).map((participant) => participant.member.id)

  return recipientIds
}
