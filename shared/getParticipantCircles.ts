import { CircleEntry, CircleWithRoleEntry } from './circle'
import { RoleEntry } from './role'

export default function getParticipantCircles(
  memberId: string,
  circles: CircleEntry[],
  roles: RoleEntry[]
): CircleWithRoleEntry[] {
  // Circles where memberId is a direct member
  const directMemberCircles = circles
    .filter((circle) =>
      circle.members.some((member) => member.memberId === memberId)
    )
    .map((circle) => {
      // Add role
      const role = roles.find((role) => role.id === circle.roleId)
      if (!role) return
      return { ...circle, role }
    })
    .filter(Boolean) as CircleWithRoleEntry[]

  // Circles where the member is a representant
  const representedCircles = directMemberCircles
    .map(({ parentId, role: { link } }) => {
      if (!link) return
      const circle =
        link === true
          ? // Parent circle
            circles.find((c) => c.id === parentId)
          : // Represented circle
            circles.find((c) => c.id === link)
      if (!circle) return
      // Add role
      const role = roles.find((role) => role.id === circle.roleId)
      if (!role) return
      return { ...circle, role }
    })
    .filter(Boolean) as CircleWithRoleEntry[]

  return [...directMemberCircles, ...representedCircles]
}
