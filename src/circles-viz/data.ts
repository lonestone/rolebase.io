import {
  CircleEntry,
  CircleMemberEntry,
  CircleWithRoleEntry,
} from '@shared/model/circle'
import { MemberEntry } from '@shared/model/member'
import { textEllipse } from 'src/utils'
import settings from './settings'
import { Data, NodeType } from './types'

// Move lost circles to root
export function fixLostCircles<Entry extends CircleEntry>(
  circles: Entry[]
): Entry[] {
  return circles.map((circle) => {
    if (!circles.find((c) => c.id === circle.parentId)) {
      return { ...circle, parentId: null }
    }
    return circle
  })
}

export function circlesToD3Data(
  circles: CircleWithRoleEntry[],
  members: MemberEntry[],
  parentId: string | null = null,
  defaultColorHue?: number
): Data[] {
  return circles
    .filter((circle) => circle.parentId == parentId)
    .map((circle) => {
      // Define circle data with role name
      const data: Data = {
        id: circle.id,
        parentCircleId: circle.parentId,
        name: textEllipse(circle.role.name, 16),
        type: NodeType.Circle,
        colorHue: circle.role.colorHue ?? defaultColorHue,
      }

      // Add sub-circles to children
      const children: Data[] = circlesToD3Data(
        circles,
        members,
        circle.id,
        data.colorHue
      )

      // Add members in a circle to group them
      if (circle.members.length !== 0 || children.length === 0) {
        children.push(
          memberstoD3Data(members, circle.id, circle.members, data.colorHue)
        )
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
  circleMembers: CircleMemberEntry[],
  colorHue?: number
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
    node.children = circleMembers
      .map((entry) => {
        const member = members.find((member) => member.id === entry.memberId)
        if (!member) return
        return {
          id: entry.id,
          memberId: entry.memberId,
          parentCircleId: circleId,
          name: textEllipse(member.name, 16),
          picture: member?.picture,
          value: settings.memberValue,
          type: NodeType.Member,
          colorHue,
        }
      })
      .filter(Boolean) as Data[]
  }
  return node
}
