import * as d3 from 'd3'
import settings from './settings'
import { Data, NodeType } from './types'

export function packData(data: Data, width: number, height: number) {
  const hierarchyNode = d3
    .hierarchy(data)
    .sum((d) => d.value || 0)
    .sort((a, b) => (b.value || 0) - (a.value || 0))
  return d3
    .pack<Data>()
    .size([width, height])
    .padding((d) =>
      d.data.type === NodeType.Circle
        ? settings.padding.circle
        : settings.padding.member
    )(hierarchyNode)
}
