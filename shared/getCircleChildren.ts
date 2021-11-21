import { CircleEntry } from './circle'
import { RoleEntry } from './role'

export default function getCircleChildrenAndRoles(
  circles: CircleEntry[],
  roles: RoleEntry[],
  circleId: string
): Array<CircleEntry & { role?: RoleEntry }> {
  return (
    circles
      .filter((c) => c.parentId === circleId)
      .map((c) => ({ ...c, role: roles.find((r) => r.id === c.roleId) })) || []
  )
}
