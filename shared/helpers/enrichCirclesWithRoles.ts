import { CircleEntry, CircleWithRoleEntry } from '../circle'
import { RoleEntry } from '../role'

export function enrichCircleWithRole(
  circle: CircleEntry,
  roles: RoleEntry[]
): CircleWithRoleEntry | undefined {
  const role = roles.find((r) => r.id === circle.roleId)
  if (!role) return
  return { ...circle, role }
}

export function enrichCirclesWithRoles(
  circles: CircleEntry[],
  roles: RoleEntry[]
) {
  return circles
    .map((circle) => enrichCircleWithRole(circle, roles))
    .filter(Boolean) as CircleWithRoleEntry[]
}
