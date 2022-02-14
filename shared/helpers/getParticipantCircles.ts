import { CircleEntry, CircleWithRoleEntry } from '../circle'
import { RoleEntry } from '../role'
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
        if (!link) return acc

        const parent = circles.find((c) => c.id === parentId)

        // Single member participate to its direct parent
        if (singleMember && parent) {
          acc.push(parent)

          // Represent its parent in grandparent
          if (link === true) {
            const grandParent =
              parent && circles.find((c) => c.id === parent.parentId)
            if (grandParent) {
              acc.push(grandParent)
            }
          }
        }

        // Represent its parent in another circle
        if (typeof link === 'string') {
          const circle = circles.find((c) => c.id === link)
          if (circle) {
            acc.push(circle)
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
