import { CircleFullFragment } from '@gql'
import { Participant } from '../model/member'

export function getCircleLeaders(
  circleOrId: CircleFullFragment | string,
  circles: CircleFullFragment[]
): Participant[] {
  const circle =
    typeof circleOrId === 'string'
      ? circles.find((c) => c.id === circleOrId)
      : circleOrId
  if (!circle) return []

  // Find sub-Circle leaders
  const leaders = circles
    .filter((c) => c.parentId === circle.id && c.role.parentLink)
    .flatMap((c) =>
      c.members.map(
        ({ member }): Participant => ({
          circleId: c.id,
          member,
        })
      )
    )

  if (leaders.length !== 0) {
    return leaders
  }

  // If no representant, Take direct members
  return circle.members.map(
    ({ member }): Participant => ({
      circleId: circle.id,
      member,
    })
  )
}
