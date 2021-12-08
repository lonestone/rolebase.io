import { CircleEntry } from './circle'
import { Participant } from './member'
import { RoleEntry } from './role'

export default function getCircleLeaders(
  circleId: string,
  circles: CircleEntry[],
  roles: RoleEntry[]
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
    .map((circle) => {
      // Find Role
      const role = roles.find((r) => r.id === circle.roleId)
      if (!role) return
      if (role.singleMember) {
        // Leader of Role
        const memberId = circle.members[0]?.memberId
        if (memberId) {
          return { circleId: circle.id, memberId }
        }
      } else {
        // Find sub-Circle Representants
        const leaders = circles
          .filter((c) => c.parentId === circle.id)
          .map((subCircle) => {
            // Find sub-Role
            const subRole = roles.find((r) => r.id === subCircle.roleId)
            if (!subRole) return
            if (subRole.link === true) {
              const memberId = subCircle.members[0]?.memberId
              if (memberId) {
                return { circleId: subCircle.id, memberId }
              }
            }
          })
          .filter(Boolean) as Participant[]
        if (leaders) return leaders

        // No leader, so we're using all direct members
        return circle.members.map(({ memberId }) => ({
          circleId: circle.id,
          memberId,
        }))
      }
    })
    .flat()
    .filter(Boolean) as Participant[]

  // Representants from other circles (links)
  const representants = roles
    // Link Roles to Circle
    .filter((role) => role.link === circleId)
    .map((role) =>
      // Find Circles using this Role
      circles
        .filter((c) => c.roleId === role.id)
        .map((circle) => {
          // Get Member id
          const memberId = circle.members[0]?.memberId
          if (memberId) {
            return { circleId: circle.id, memberId }
          }
        })
    )
    .flat()
    .filter(Boolean) as Participant[]

  return [...leaders, ...representants, ...directParticipants]
}
