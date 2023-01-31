import { CircleFullFragment } from '@gql'
import { Participant } from '../model/member'
import { RoleLink } from '../model/role'

export function getCircleParticipants(
  circleId: string,
  circles: CircleFullFragment[]
): Participant[] {
  const currentCircle = circles.find((c) => c.id === circleId)

  // Direct members
  const directParticipants =
    currentCircle?.members.map(({ memberId }) => ({
      circleId,
      memberId,
    })) || []

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
            return subCircle.members.map((member) =>
              optionalParticipant(circle.id, member.memberId)
            )
          }
          return
        })
        .filter(Boolean) as Participant[]

      if (leaders.length !== 0) {
        return leaders
      }

      // If no representant, Take direct members
      return circle.members.map((member) =>
        optionalParticipant(circle.id, member.memberId)
      )
    })
    .filter(Boolean) as Participant[]

  // Representants from other circles (links)
  const representants =
    // Find Circles using this Role
    circles
      .filter((c) => c.role.link === circleId)
      // Get Member id
      .flatMap((circle) =>
        circle.members.map((member) =>
          optionalParticipant(circle.parentId, member.memberId)
        )
      )
      .filter(Boolean) as Participant[]

  return [...leaders, ...representants, ...directParticipants]
}

function optionalParticipant(
  circleId?: string | null,
  memberId?: string | null
): Participant | undefined {
  return circleId && memberId ? { circleId, memberId } : undefined
}
