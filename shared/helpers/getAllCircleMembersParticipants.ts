import { CircleEntry } from '../circle'
import { Participant } from '../member'
import { RoleEntry } from '../role'
import { getCircleParticipants } from './getCircleParticipants'

export function getAllCircleMembersParticipants(
  circleId: string,
  circles: CircleEntry[],
  roles: RoleEntry[]
): Participant[] {
  // Circle participants
  const participants = getCircleParticipants(circleId, circles, roles, true)

  // Add sub-Circles
  const subCirclesParticipants = circles
    .filter((c) => c.parentId === circleId)
    .map((c) => {
      const role = roles.find((r) => r.id === c.roleId)
      // Skip Leaders because they are already in participants
      if (!role || role.link === true) return
      return getAllCircleMembersParticipants(c.id, circles, roles)
    })
    .filter(Boolean)
    .flat() as Participant[]

  return [...subCirclesParticipants, ...participants]
}
