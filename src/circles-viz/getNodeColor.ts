import { lastColorMode } from '@components/pages/CirclesPage'
import { circleColor } from 'src/theme'
import { NodeData, NodeType } from './types'

export function getNodeColor(nodeData: NodeData, depth?: number) {
  if (!depth) depth = nodeData.depth

  // Circle color
  if (nodeData.data.type === NodeType.Circle) {
    const lightness = 94 - (depth - 1) * 7
    return circleColor(
      `${
        // Use color mode (light/dark)
        lastColorMode === 'light' ? lightness : 110 - lightness
      }%`,
      nodeData.data.hue
    )
  }
  // Members background color
  if (nodeData.data.type === NodeType.MembersCircle) {
    return 'transparent'
  }
  // Member color
  return lastColorMode == 'light' ? circleColor('95%') : circleColor('10%')
}
