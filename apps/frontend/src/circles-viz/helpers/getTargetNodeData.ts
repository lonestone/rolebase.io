import { D3DragEvent } from 'd3'
import { Data, NodeData, NodesSelection, NodeType, Zoom } from '../types'
import { isPointInsideCircle } from './isPointInsideCircle'

export function getTargetNodeData(
  nodes: NodesSelection,
  event: D3DragEvent<SVGGElement, Data, Element>,
  zoom: Zoom
): NodeData | null {
  const x = (event.sourceEvent.offsetX - zoom.x) / zoom.scale
  const y = (event.sourceEvent.offsetY - zoom.y) / zoom.scale

  // Get circles under the mouse
  const currentTargets = nodes.filter(
    (node) =>
      node.data.type === NodeType.Circle &&
      isPointInsideCircle(x, y, node.x, node.y, node.r)
  )

  // Get last descendants under the mouse
  return (
    currentTargets
      .data()
      .reduce<{ max: number; node?: NodeData }>(
        (acc, node) =>
          !node || node.depth > acc.max ? { max: node.depth, node } : acc,
        { max: 0 }
      ).node || null
  )
}
