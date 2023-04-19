import { CircleFullFragment } from '@gql'
import { Participant } from '../model/member'
import { RoleLink } from '../model/role'

export function getCircleParticipants(
  circleId: string,
  circles: CircleFullFragment[]
): Participant[] {
  const currentCircle = circles.find((c) => c.id === circleId)

  // Leaders of Roles and sub-Circles in Circle
  const leaders = circles
    // Children of Circle
    .filter((c) => c.parentId === circleId)
    .flatMap((circle) => {
      // Find sub-Circle Representants
      const leaders = circles
        .filter((c) => c.parentId === circle.id)
        .flatMap((subCircle) => {
          // Find sub-Role
          if (subCircle.role.link === RoleLink.Parent) {
            return subCircle.members.map(({ member }) => ({
              circleId: circle.id,
              member,
              leader: circle.role.link === RoleLink.Parent,
            }))
          }
          return
        })
        .filter(Boolean) as Participant[]

      if (leaders.length !== 0) {
        return leaders
      }

      // If no representant, Take direct members
      return circle.members.map(({ member }) => ({
        circleId: circle.id,
        member,
        leader: circle.role.link === RoleLink.Parent,
      }))
    })
    .filter(Boolean) as Participant[]

  const hasLeader = leaders.some((l) => l.leader)

  // Direct members
  const directParticipants =
    currentCircle?.members.map(
      ({ member }): Participant => ({
        circleId,
        member,
        leader: !hasLeader,
      })
    ) || []

  // Representants from other circles (links)
  const representants =
    // Find Circles using this Role
    circles
      .filter((c) => c.role.link === circleId)
      // Get Member id
      .flatMap((circle) =>
        circle.members.map(({ member }) => ({
          circleId: circle.parentId,
          member,
        }))
      )
      .filter(Boolean) as Participant[]

  return [...leaders, ...representants, ...directParticipants]
}
