import { CircleFullFragment } from '../gql'
import { Participant } from '../model/member'
import { getCircleParticipants } from './getCircleParticipants'

export function getAllCircleMembersParticipants(
  circleOrId: CircleFullFragment | string,
  circles: CircleFullFragment[]
): Participant[] {
  const circleId = typeof circleOrId === 'string' ? circleOrId : circleOrId.id

  // Circle participants
  const participants = getCircleParticipants(circleOrId, circles)

  // Add sub-Circles
  const subCirclesParticipants = circles
    .filter(
      (c) =>
        c.parentId === circleId &&
        // Skip Leaders because they are already in participants
        !c.role.parentLink
    )
    .flatMap((c) => getAllCircleMembersParticipants(c.id, circles))

  return [...subCirclesParticipants, ...participants]
}
