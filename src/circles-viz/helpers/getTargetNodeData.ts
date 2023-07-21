import { D3DragEvent } from 'd3'
import { Graph } from '../Graph'
import { Data, NodeData, NodesSelection, NodeType } from '../types'
import { isPointInsideCircle } from './isPointInsideCircle'

export function getTargetNodeData(
  nodes: NodesSelection,
  event: D3DragEvent<SVGGElement, Data, Element>,
  graph: Graph
): NodeData | null {
  const position = graph.getDragEventPosition(event)

  // Get circles under the mouse
  const currentTargets = nodes.filter(
    (node) =>
      node.data.type === NodeType.Circle &&
      isPointInsideCircle(position.x, position.y, node.x, node.y, node.r)
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
