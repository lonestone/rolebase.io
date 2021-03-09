import * as d3 from 'd3'
import settings from './settings'
import { Data, NodeType } from './types'

export function packData(data: Data, width: number, height: number) {
  const hierarchyNode = d3
    .hierarchy(data)
    .sum((d) => d.value || 0)
    .sort((a, b) => (a.value || 0) - (b.value || 0))
  return d3
    .pack<Data>()
    .size([width, height])
    .padding((d) => {
      // Circle
      if (d.data.type === NodeType.Circle) {
        // Circle containing circles
        if (d.data.children?.some((c) => c.type === NodeType.Circle)) {
          return settings.padding.circle
        }
        // Circle containing only members
        else {
          return settings.padding.membersCircle
        }
      }
      return settings.padding.member
    })(hierarchyNode)
}
