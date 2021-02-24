import * as d3 from 'd3'
import { NodeData, NodeType } from './types'

const color = d3.scaleOrdinal(d3.schemeSet3)

export function getNodeColor(node: NodeData) {
  if (node.data.type === NodeType.Circle) return color(node.depth.toString())
  if (node.data.type === NodeType.MembersCircle) return 'transparent'
  return 'white'
}
