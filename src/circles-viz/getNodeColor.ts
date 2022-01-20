import { lastColorMode } from '@components/pages/CirclesPage'
import { mainColor } from 'src/theme'
import { NodeType } from './types'

// const color = (n: number) => d3.schemePastel1[n % d3.schemePastel1.length]

function getCircleColor(depth: number) {
  // Lightess from depth
  const lightness = 94 - (depth - 1) * 7
  return mainColor(
    `${
      // Use color mode (light/dark)
      lastColorMode === 'light' ? lightness : 110 - lightness
    }%`
  )
}

export function getNodeColor(nodeType: NodeType, depth = 1) {
  // Circle color
  if (nodeType === NodeType.Circle) return getCircleColor(depth)
  if (nodeType === NodeType.MembersCircle) return 'transparent'
  // Member color
  return lastColorMode == 'light' ? mainColor('95%') : mainColor('10%')
}
