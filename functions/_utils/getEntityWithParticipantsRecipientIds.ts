import { EntityWithParticipantsAndOrgId } from '@shared/model/participants'
import { getParticipantsByScope } from '@shared/helpers/getParticipantsByScope'
import { getOrgCirclesFullAndMembers } from '@utils/getOrgCirclesFullAndMembers'
import { RouteError } from '@utils/route'

// Beware, this function is quite heavy, use it wisely
// Be careful not to use with getParticipantIdsDiff because of heavy call redundancy
export async function getEntityWithParticipantsRecipientIds(
  entity: EntityWithParticipantsAndOrgId
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
