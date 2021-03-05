import * as d3 from 'd3'
import { NodeType } from './types'

const color = (n: number) => d3.schemePastel1[n % d3.schemePastel1.length]

export function getNodeColor(nodeType: NodeType, depth = 1) {
  // Circle color
  if (nodeType === NodeType.Circle) return color(depth)
  if (nodeType === NodeType.MembersCircle) return 'transparent'
  // Member color
  return '#efefef'
}
