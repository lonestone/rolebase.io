import { CircleFullFragment } from '@gql'
import { textEllipsis } from '@utils/textEllipsis'
import settings from './settings'
import { Data, NodeType } from './types'

// Move lost circles to root
export function fixLostCircles(
  circles: CircleFullFragment[]
): CircleFullFragment[] {
  return circles.map((circle) => {
    if (!circles.find((c) => c.id === circle.parentId)) {
      return { ...circle, parentId: null }
    }
    return circle
  })
}

export function circlesToD3Data(
  circles: CircleFullFragment[],
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
        name: textEllipsis(circle.role.name, 20),
        type: NodeType.Circle,
        colorHue: circle.role.colorHue ?? defaultColorHue,
      }

      // Add sub-circles to children
      const children: Data[] = circlesToD3Data(
        circles,
        circle.id,
        data.colorHue
      )

      // Add members in a circle to group them
      if (circle.members.length !== 0 || children.length === 0) {
        children.push(memberstoD3Data(circle, data.colorHue))
      }

      // Set children if there is at least one
      if (children.length !== 0) {
        data.children = children
      }
      return data
    })
}

function memberstoD3Data(circle: CircleFullFragment, colorHue?: number): Data {
  const node: Data = {
    id: `${circle.id}-members`,
    parentCircleId: circle.id,
    name: '',
    type: NodeType.MembersCircle,
  }
  if (circle.members.length === 0) {
    node.value = settings.memberValue
  } else {
    node.children = circle.members.map((entry) => ({
      id: entry.id,
      memberId: entry.memberId,
      parentCircleId: circle.id,
      name: textEllipsis(entry.member.name, 20),
      picture: entry.member.picture,
      value: settings.memberValue,
      type: NodeType.Member,
      colorHue,
    }))
  }
  return node
}
