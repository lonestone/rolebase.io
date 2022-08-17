import { CircleWithRoleEntry } from '../model/circle'
import { Participant } from '../model/member'
import { getCircleParticipants } from './getCircleParticipants'

export function getAllCircleMembersParticipants(
  circleId: string,
  circles: CircleWithRoleEntry[]
): Participant[] {
  // Circle participants
  const participants = getCircleParticipants(circleId, circles)

  // Add sub-Circles
  const subCirclesParticipants = circles
    .filter(
      (c) =>
        c.parentId === circleId &&
        // Skip Leaders because they are already in participants
        c.role.link !== true
    )
    .flatMap((c) => getAllCircleMembersParticipants(c.id, circles))

  return [...subCirclesParticipants, ...participants]
}
