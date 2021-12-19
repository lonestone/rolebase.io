import { CircleEntry, CircleWithRoleEntry } from './circle'
import { RoleEntry } from './role'

export default function enrichCirclesWithRoles(
  circles: CircleEntry[],
  roles: RoleEntry[]
) {
  return circles
    .map((c) => {
      const role = roles.find((r) => r.id === c.roleId)
      if (!role) return
      return { ...c, role }
    })
    .filter(Boolean) as CircleWithRoleEntry[]
}
