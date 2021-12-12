import * as d3 from 'd3'
import settings from './settings'
import { Data, NodeType } from './types'

export function packData(data: Data) {
  const hierarchyNode = d3
    .hierarchy(data)
    .sum((d) => d.value || 0)
    .sort((a, b) => (a.value || 0) - (b.value || 0))
  return (
    d3
      .pack<Data>()
      // .size([width, height])
      .radius((d) => settings.memberValue)
      .padding((d) => {
        // Circle
        const multipleChildren = (d.data.children?.length || 0) > 1
        if (d.data.type === NodeType.Circle) {
          const hasSubCircles = d.data.children?.some(
            (c) => c.type === NodeType.Circle
          )
          if (!hasSubCircles) return settings.padding.circleWithoutSubCircle
          return multipleChildren
            ? settings.padding.circleWithSubCircles
            : settings.padding.circleWithSingleSubCircle
        } else if (d.data.type === NodeType.MembersCircle) {
          // Members Circle
          return settings.padding.membersCircle
        }
        return 0
      })(hierarchyNode)
  )
}
