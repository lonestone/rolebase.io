import { defaultCircleColorHue } from 'src/theme'
import { NodeData, NodesSelection } from './types'

export function setNodeCSSVariables(nodes: NodesSelection) {
  nodes.each((d: NodeData, i, nodes) => {
    const node = nodes[i]
    node.style.setProperty('--depth', d.depth.toString())
    node.style.setProperty(
      '--hue',
      (d.data.colorHue ?? defaultCircleColorHue).toString()
    )
  })
}
