import { CircleEntry, CircleWithRoleEntry } from '../circle'
import { RoleEntry } from '../role'
import { enrichCirclesWithRoles } from './enrichCirclesWithRoles'

export function getCircleChildrenAndRoles(
  circles: CircleEntry[],
  roles: RoleEntry[],
  circleId: string | null
): Array<CircleWithRoleEntry> {
  return enrichCirclesWithRoles(
    circles.filter((c) => c.parentId === circleId),
    roles
  )
}
