import { getParticipantsByScope } from '@shared/helpers/getParticipantsByScope'
import { EntityWithParticipantsAndOrgId } from '@shared/model/participants'
import { getOrgCirclesFullAndMembers } from '@utils/getOrgCirclesFullAndMembers'
import { RouteError } from '@utils/route'

// Beware, this function is quite heavy, use it wisely
// Be careful not to use with getEntityWithParticipantsRecipientIds because of heavy call redundancy
export async function getParticipantIdsDiff(
  oldData: EntityWithParticipantsAndOrgId,
  newData: EntityWithParticipantsAndOrgId
) {
  if (!oldData || !newData) {
    throw new RouteError(400, 'Bad request')
  }

  const { circles, members } = await getOrgCirclesFullAndMembers(newData.orgId)

  // Get oldData participants
  const oldDataParticipantIds = getParticipantsByScope(
    members,
    oldData.circleId,
    circles,
    oldData.participantsScope,
    oldData.participantsMembersIds
  ).map((participant) => participant.member.id)

  // Get newData participants
  const newParticipantIds = getParticipantsByScope(
    members,
    newData.circleId,
    circles,
    newData.participantsScope,
    newData.participantsMembersIds
  ).map((participant) => participant.member.id)

  // Get participants diff between oldData and newData
  const participantIdsDiff = newParticipantIds.filter(
    (id) => !oldDataParticipantIds.includes(id)
  )

  return participantIdsDiff
}
