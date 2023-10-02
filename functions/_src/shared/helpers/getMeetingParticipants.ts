import { CircleFullFragment, MeetingFragment, MemberFragment } from '@gql'
import { getParticipantsByScope } from '@shared/helpers/getParticipantsByScope'
import { truthy } from '@shared/helpers/truthy'
import { ParticipantMember } from '@shared/model/member'

export function getMeetingParticipants(
  meeting: MeetingFragment | null | undefined,
  circles: CircleFullFragment[],
  members: MemberFragment[]
): ParticipantMember[] {
  if (!meeting || meeting.archived) return []
  if (meeting.attendees) {
    return meeting.attendees
      .map((attendee) => {
        const member = members.find((member) => member.id === attendee.memberId)
        if (!member) return
        return {
          member,
          circlesIds: attendee.circlesIds,
        }
      })
      .filter(truthy)
  }
  return getParticipantsByScope(
    members,
    meeting.circleId,
    circles,
    meeting.participantsScope,
    meeting.participantsMembersIds
  )
}
