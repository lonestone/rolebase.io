import { CircleEntry, CircleWithRoleEntry } from '../model/circle'
import { RoleEntry } from '../model/role'
import { enrichCirclesWithRoles } from './enrichCirclesWithRoles'

export function getParticipantCircles(
  memberId: string,
  circles: CircleEntry[],
  roles: RoleEntry[]
): CircleWithRoleEntry[] {
  // Circles where memberId is a direct member
  const directMemberCircles = enrichCirclesWithRoles(
    circles.filter((circle) =>
      circle.members.some((member) => member.memberId === memberId)
    ),
    roles
  )

  // Circles where the member is a representant
  const representedCircles = enrichCirclesWithRoles(
    directMemberCircles.reduce<CircleEntry[]>(
      (acc, { id, parentId, role: { link } }) => {
        // Find Leader
        const leader = circles.find((circle) => {
          if (circle.parentId !== id) return false
          const role = roles.find((r) => r.id === circle.roleId)
          return role?.link === true
        })
        if (!leader) {
          const parent = circles.find((c) => c.id === parentId)
          if (!parent) return acc

          // Member represents its role in its parent if there is no leader
          acc.push(parent)

          if (link === true) {
            // It represents its parent in grandparent
            const grandParent = circles.find((c) => c.id === parent.parentId)
            if (grandParent) {
              acc.push(grandParent)
            }
          } else if (typeof link === 'string') {
            // It represents its parent in another circle
            const circle = circles.find((c) => c.id === link)
            if (circle) {
              acc.push(circle)
            }
          }
        }
        return acc
      },
      []
    ),
    roles
  )

  return [...directMemberCircles, ...representedCircles]
}
