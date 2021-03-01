import * as d3 from 'd3'
import { NodeType } from './types'

const color = d3.scaleOrdinal(d3.schemeSet3)

export function getNodeColor(nodeType: NodeType, depth = 1) {
  // Circle color
  if (nodeType === NodeType.Circle) return color(depth.toString())
  if (nodeType === NodeType.MembersCircle) return 'transparent'
  // Member color
  return '#efefef'
}
