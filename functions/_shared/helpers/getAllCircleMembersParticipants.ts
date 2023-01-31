import { CircleFullFragment } from '@gql'
import { Participant } from '../model/member'
import { RoleLink } from '../model/role'
import { getCircleParticipants } from './getCircleParticipants'

export function getAllCircleMembersParticipants(
  circleId: string,
  circles: CircleFullFragment[]
): Participant[] {
  // Circle participants
  const participants = getCircleParticipants(circleId, circles)

  // Add sub-Circles
  const subCirclesParticipants = circles
    .filter(
      (c) =>
        c.parentId === circleId &&
        // Skip Leaders because they are already in participants
        c.role.link !== RoleLink.Parent
    )
    .flatMap((c) => getAllCircleMembersParticipants(c.id, circles))

  return [...subCirclesParticipants, ...participants]
}
