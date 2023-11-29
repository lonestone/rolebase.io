import { CircleFullFragment } from '@gql'
import { Participant } from '../model/member'
import { getCircleLeaders } from './getCircleLeaders'

export function getCircleParticipants(
  circleOrId: CircleFullFragment | string,
  circles: CircleFullFragment[]
): Participant[] {
  const circle =
    typeof circleOrId === 'string'
      ? circles.find((c) => c.id === circleOrId)
      : circleOrId
  if (!circle) return []

  let hasLeader = false

  // Leaders of Roles and sub-Circles in Circle
  const leaders = circles
    // Children of Circle
    .filter((c) => c.parentId === circle.id)
    .flatMap((c) => {
      const leaders = getCircleLeaders(c, circles)
      if (c.role.parentLink && leaders.length > 0) {
        hasLeader = true
        return leaders.map((p) => ({ ...p, leader: true }))
      } else {
        return leaders
      }
    })

  // Direct members
  const directParticipants =
    circle.members.map(
      ({ member }): Participant => ({
        circleId: circle.id,
        member,
        leader: !hasLeader,
      })
    ) || []

  // Links to other circles
  const links = circle.invitedCircleLinks
    .flatMap((link) => getCircleLeaders(link.invitedCircle.id, circles))
    .map((p) => ({ ...p, invited: true }))

  return [...leaders, ...directParticipants, ...links]
}
