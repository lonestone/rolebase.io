import { CircleEntry } from './circle'
import { Participant } from './member'
import { RoleEntry } from './role'

export default function getAllCircleMembersParticipants(
  circleId: string,
  circles: CircleEntry[],
  roles: RoleEntry[]
): Participant[] {
  const circle = circles.find((c) => c.id === circleId)

  // Direct members
  const directParticipants =
    circle?.members.map(({ memberId }) => ({
      circleId,
      memberId,
    })) || []

  // Add sub-Circles
  const subCirclesParticipants = circles
    .filter((c) => c.parentId === circleId)
    .map((c) => getAllCircleMembersParticipants(c.id, circles, roles))
    .flat()

  return [...subCirclesParticipants, ...directParticipants]
}
