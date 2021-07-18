import { CircleEntry, CircleWithRoleEntry } from '../api/entities/circles'
import { RoleEntry } from '../api/entities/roles'

// Find a circle and its parent, and return their ids and roles
export function getCircleRoles(
  circles: CircleEntry[],
  roles: RoleEntry[],
  circleId: string
): CircleWithRoleEntry[] {
  // Find circle
  const circle = circles.find((c) => c.id === circleId)
  if (!circle) return []

  // Find role
  const role = roles.find((r) => r.id === circle.roleId)

  // Return circle, its roles and its parents
  if (circle.parentId) {
    return [
      ...getCircleRoles(circles, roles, circle.parentId),
      { ...circle, role },
    ]
  }
  return [{ ...circle, role }]
}