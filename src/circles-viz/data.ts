import { CircleEntry, CircleMemberEntry } from '../data/circles'
import { MemberEntry } from '../data/members'
import { RoleEntry } from '../data/roles'
import settings from './settings'
import { Data, NodeType } from './types'

// Move lost circles to root
export function fixLostCircles(circles: CircleEntry[]) {
  return circles.map((circle) => {
    if (!circles.find((c) => c.id === circle.parentId)) {
      return { ...circle, parentId: null }
    }
    return circle
  })
}

export function circlesToD3Data(
  circles: CircleEntry[],
  roles: RoleEntry[],
  members: MemberEntry[],
  parentId: string | null = null
): Data[] {
  return circles
    .filter((circle) => circle.parentId == parentId)
    .map((circle) => {
      // Define circle data with role name
      const data: Data = {
        id: circle.id,
        parentCircleId: circle.parentId,
        name: roles.find((role) => role.id === circle.roleId)?.name || '?',
        type: NodeType.Circle,
      }

      // Add sub-circles to children
      const children: Data[] = circlesToD3Data(
        circles,
        roles,
        members,
        circle.id
      )

      // Add members in a circle to group them
      if (circle.members.length !== 0 || children.length === 0) {
        children.push(memberstoD3Data(members, circle.id, circle.members))
      }

      // Set children if there is at least one
      if (children.length !== 0) {
        data.children = children
      }
      return data
    })
}
function memberstoD3Data(
  members: MemberEntry[],
  circleId: string,
  circleMembers: CircleMemberEntry[]
): Data {
  const node: Data = {
    id: `${circleId}-members`,
    parentCircleId: circleId,
    name: '',
    type: NodeType.MembersCircle,
  }
  if (circleMembers.length === 0) {
    node.value = settings.memberValue
  } else {
    node.children = circleMembers.map((entry) => {
      const member = members.find((member) => member.id === entry.memberId)
      return {
        id: entry.id,
        memberId: entry.memberId,
        parentCircleId: circleId,
        name: member?.name || '?',
        picture: member?.picture,
        value: settings.memberValue,
        type: NodeType.Member,
      }
    })
  }
  return node
}
