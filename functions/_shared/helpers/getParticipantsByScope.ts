import { CircleFullFragment, MemberFragment, Member_Scope_Enum } from '@gql'
import { getAllCircleMembersParticipants } from '@shared/helpers/getAllCircleMembersParticipants'
import { getCircleParticipants } from '@shared/helpers/getCircleParticipants'
import { groupParticipantsByMember } from '@shared/helpers/groupParticipantsByMember'
import { Participant, ParticipantMember } from '@shared/model/member'
import { Optional } from '@shared/model/types'

export function getParticipantsByScope(
  members: MemberFragment[],
  circleId: string,
  circles: CircleFullFragment[],
  scope: Member_Scope_Enum,
  extraMembersIds: string[]
): ParticipantMember[] {
  let participants: Optional<Participant, 'circleId'>[] = []

  if (circleId && scope && circles) {
    // Get participants by scope
    if (scope === Member_Scope_Enum.Organization) {
      // Get all organization members
      participants =
        members.map((member) => ({
          member,
        })) || []
    } else if (scope === Member_Scope_Enum.CircleLeaders) {
      // Get circle and links leaders
      participants = getCircleParticipants(circleId, circles)
    } else if (scope === Member_Scope_Enum.CircleMembers) {
      // Get all circle members
      participants = getAllCircleMembersParticipants(circleId, circles)
    }
  }

  // Get extra participants added to those of the scope
  if (extraMembersIds) {
    for (const memberId of extraMembersIds) {
      const member = members.find((m) => m.id === memberId)
      if (member) {
        participants.push({ member })
      }
    }
  }

  return groupParticipantsByMember(participants)
}
