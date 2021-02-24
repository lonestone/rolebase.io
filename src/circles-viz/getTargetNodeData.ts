import { D3DragEvent } from 'd3'
import { isPointInsideCircle } from './isPointInsideCircle'
import { Data, NodeData, NodesSelection, NodeType } from './types'

export function getTargetNodeData(
  nodes: NodesSelection,
  event: D3DragEvent<SVGGElement, Data, Element>
): NodeData | null {
  // Get circles under the mouse
  const currentTargets = nodes.filter(
    (node) =>
      node.data.type === NodeType.Circle &&
      isPointInsideCircle(
        event.sourceEvent.offsetX,
        event.sourceEvent.offsetY,
        node.x,
        node.y,
        node.r
      )
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
