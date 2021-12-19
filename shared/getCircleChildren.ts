import { CircleEntry, CircleWithRoleEntry } from './circle'
import enrichCirclesWithRoles from './enrichCirclesWithRoles'
import { RoleEntry } from './role'

export default function getCircleChildrenAndRoles(
  circles: CircleEntry[],
  roles: RoleEntry[],
  circleId: string | null
): Array<CircleWithRoleEntry> {
  return enrichCirclesWithRoles(
    circles.filter((c) => c.parentId === circleId),
    roles
  )
}
