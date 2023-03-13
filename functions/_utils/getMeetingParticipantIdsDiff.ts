import { Meeting_Set_Input, Member_Scope_Enum } from '@gql'
import { RouteError } from '@utils/route'
import { getParticipantIdsByScope } from './getParticipantIdsByScope'

export async function getMeetingParticipantIdsDiff(
  oldMeeting: Meeting_Set_Input,
  newMeeting: Meeting_Set_Input
) {
  if (!oldMeeting || !newMeeting) {
    throw new RouteError(400, 'Bad request')
  }

  // Get old participants
  const oldParticipantIds = await getParticipantIdsByScope(
    oldMeeting.orgId!,
    oldMeeting.circleId!,
    oldMeeting.participantsScope as Member_Scope_Enum,
    oldMeeting.participantsMembersIds
  )

  // Get new participants
  const newParticipantIds = await getParticipantIdsByScope(
    newMeeting.orgId!,
    newMeeting.circleId!,
    newMeeting.participantsScope as Member_Scope_Enum,
    newMeeting.participantsMembersIds
  )

  // Get participants diff between old and new
  const participantIdsDiff = newParticipantIds.filter(
    (id) => !oldParticipantIds.includes(id)
  )

  return participantIdsDiff
}
