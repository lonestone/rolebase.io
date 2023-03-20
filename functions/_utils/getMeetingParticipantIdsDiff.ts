import { MeetingFragment, Member_Scope_Enum } from '@gql'
import { getParticipantsByScope } from '@shared/helpers/getParticipantsByScope'
import { RouteError } from '@utils/route'
import { getOrgCirclesFullAndMembers } from '@utils/getOrgCirclesFullAndMembers'

export async function getMeetingParticipantIdsDiff(
  oldMeeting: MeetingFragment,
  newMeeting: MeetingFragment
) {
  if (!oldMeeting || !newMeeting) {
    throw new RouteError(400, 'Bad request')
  }

  const org = await getOrgCirclesFullAndMembers(newMeeting.orgId)
  if (!org) {
    throw new RouteError(404, 'Org not found')
  }

  // Get old participants
  const oldParticipantIds = getParticipantsByScope(
    org.members,
    oldMeeting.circleId,
    org.circles,
    oldMeeting.participantsScope as Member_Scope_Enum,
    oldMeeting.participantsMembersIds
  ).map((participant) => participant.member.id)

  // Get new participants
  const newParticipantIds = getParticipantsByScope(
    org.members,
    newMeeting.circleId,
    org.circles,
    newMeeting.participantsScope as Member_Scope_Enum,
    newMeeting.participantsMembersIds
  ).map((participant) => participant.member.id)

  // Get participants diff between old and new
  const participantIdsDiff = newParticipantIds.filter(
    (id) => !oldParticipantIds.includes(id)
  )

  return participantIdsDiff
}
