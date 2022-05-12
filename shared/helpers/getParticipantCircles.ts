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
      (acc, { parentId, role: { singleMember, link } }) => {
        const parent = circles.find((c) => c.id === parentId)
        if (!parent) return acc

        if (singleMember) {
          // Single member participate to its direct parent
          acc.push(parent)

          // It represents its parent in grandparent
          if (link === true) {
            const grandParent = circles.find((c) => c.id === parent.parentId)
            if (grandParent) {
              acc.push(grandParent)
            }
          }

          // It represents its parent in another circle
          else if (typeof link === 'string') {
            const circle = circles.find((c) => c.id === link)
            if (circle) {
              acc.push(circle)
            }
          }
        } else {
          // Circle
          // Member represents its role in its parent if there is no leader
          const leader = circles.find((circle) => {
            if (circle.parentId !== parent.id) return false
            const role = roles.find((r) => r.id === circle.roleId)
            if (!role) return false
            return role.singleMember && role.link === true
          })
          if (!leader) {
            acc.push(parent)
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
