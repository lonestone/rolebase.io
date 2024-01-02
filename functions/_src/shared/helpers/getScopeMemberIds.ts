import { CircleFullFragment } from '@gql'
import { getAllCircleMembersParticipants } from '@shared/helpers/getAllCircleMembersParticipants'
import { getCircleParticipants } from '@shared/helpers/getCircleParticipants'
import { ParticipantsScope } from '@shared/model/participants'

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
