import { CircleFullFragment } from '@gql'
import { RoleLink } from '../model/role'

export function getParticipantCircles(
  memberId: string,
  circles: CircleFullFragment[]
): CircleFullFragment[] {
  // Circles where memberId is a direct member
  const directMemberCircles = circles.filter((circle) =>
    circle.members.some((member) => member.memberId === memberId)
  )

  // Circles where the member is a representant
  const representedCircles = directMemberCircles.reduce<CircleFullFragment[]>(
    (acc, { id, parentId, role: { link } }) => {
      // Find Leader
      const leader = circles.find((circle) => {
        if (circle.parentId !== id) return false
        return circle.role.link === RoleLink.Parent
      })
      if (!leader) {
        const parent = circles.find((c) => c.id === parentId)
        if (!parent) return acc

        // Member represents its role in its parent if there is no leader
        acc.push(parent)

        if (link === RoleLink.Parent) {
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
  )

  return [...directMemberCircles, ...representedCircles]
}
