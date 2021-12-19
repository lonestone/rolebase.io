import { NodeType } from './types'

// const color = (n: number) => d3.schemePastel1[n % d3.schemePastel1.length]
const color = (n: number) => `hsl(192deg 75% ${94 - (n - 1) * 7}%)`

export function getNodeColor(nodeType: NodeType, depth = 1) {
  // Circle color
  if (nodeType === NodeType.Circle) return color(depth)
  if (nodeType === NodeType.MembersCircle) return 'transparent'
  // Member color
  return '#efefef'
}
