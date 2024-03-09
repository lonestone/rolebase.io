import { CircleFullFragment } from '../gql'
import { ParticipantsScope } from '../model/participants'
import { getAllCircleMembersParticipants } from './getAllCircleMembersParticipants'
import { getCircleParticipants } from './getCircleParticipants'

export function getScopeMemberIds(
  scope: ParticipantsScope,
  circles: CircleFullFragment[]
): string[] {
  const membersIds = [...scope.members]

  for (const circle of scope.circles) {
    const participants = circle.children
      ? getAllCircleMembersParticipants(circle.id, circles)
      : getCircleParticipants(circle.id, circles)

    for (const participant of participants) {
      const memberId = participant.member.id
      if (circle.excludeMembers.includes(memberId)) continue
      if (membersIds.includes(memberId)) continue
      membersIds.push(memberId)
    }
  }

  return membersIds
}
