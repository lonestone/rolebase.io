import { CircleEntry, CircleWithRoleEntry } from './circle'
import enrichCirclesWithRoles from './enrichCirclesWithRoles'
import { RoleEntry } from './role'

export default function getParticipantCircles(
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
    directMemberCircles
      .map(({ parentId, role: { link } }): CircleEntry | undefined => {
        if (!link) return
        return link === true
          ? // Parent circle
            circles.find((c) => c.id === parentId)
          : // Represented circle
            circles.find((c) => c.id === link)
      })
      .filter(Boolean) as CircleEntry[],
    roles
  )

  return [...directMemberCircles, ...representedCircles]
}
