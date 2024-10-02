import { Graph } from '@/graph/graphs/Graph'
import { NodeData, NodeType } from '@/graph/types'
import { truthy } from '@rolebase/shared/helpers/truthy'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { isPointInsideCircle } from '../../svg/helpers/isPointInsideCircle'

interface Position {
  x: number
  y: number
}

interface DragNode {
  node: NodeData
  element: HTMLDivElement
}

export function useDragNode(graph: Graph, node: NodeData) {
  const dragOrigin = useRef<Position>()
  const dragNodes = useRef<DragNode[]>([])
  const dragTargets = useRef<DragNode[]>([])
  const dragTarget = useRef<DragNode | undefined>()

  const canDrag = useMemo(
    () =>
      // Disable when events are not provided
      graph.params.events.onCircleMove &&
      graph.params.events.onMemberMove &&
      // Disable for invited circles (links)
      node.data.id.indexOf('_') === -1,
    [node, graph]
  )

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const isDragging =
        canDrag &&
        // Disable when mousewheel is pressed
        event.button !== 1 &&
        // Control/Command key is pressed
        (event.ctrlKey || event.metaKey)
      if (!isDragging) return

      // Register mouse position
      dragOrigin.current = { x: event.clientX, y: event.clientY }

      // Register nodes to drag
      const descendants = node.descendants()
      dragNodes.current = [node, ...descendants]
        .map((d) => {
          const element = getNodeElement(d)
          if (!element) return
          return {
            node: d,
            element,
          }
        })
        .filter(truthy)

      // Register targets
      dragTargets.current = graph.nodes
        .filter(
          (d) => !descendants.includes(d) && d.data.type === NodeType.Circle
        )
        .map((d) => {
          const element = getNodeElement(d)
          if (!element) return
          return {
            node: d,
            element,
          }
        })
        .filter(truthy)

      // Add classes
      dragNodes.current[0].element.classList.add('drag-node')
      dragNodes.current.forEach((d) => {
        d.element.classList.add('dragging')
      })

      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('mousemove', handleMouseMove)
    },
    [canDrag, graph, node]
  )

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('mousemove', handleMouseMove)

    // Remove classes
    dragNodes.current[0]?.element.classList.remove('drag-node')
    dragNodes.current.forEach((d) => {
      d.element.classList.remove('dragging')
    })
    dragTarget.current?.element.classList.remove('drag-target')

    // Reset dragged circles
    const actionMoved = false
    if (dragNodes.current && !actionMoved) {
      dragNodes.current.forEach((d) => {
        setTimeout(() => {
          d.element.style.transform = `translate(${d.node.x - d.node.r}px, ${
            d.node.y - d.node.r
          }px)`
        }, 0)
      })
    }

    // Reset refs
    dragOrigin.current = undefined
    dragNodes.current = []
    dragTargets.current = []
    dragTarget.current = undefined
  }, [graph])

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!dragOrigin.current || !dragTargets.current) return

      const { k } = graph.zoomTransform
      const dX = (event.clientX - dragOrigin.current.x) / k
      const dY = (event.clientY - dragOrigin.current.y) / k

      dragNodes.current.forEach((d) => {
        d.element.style.transform = `translate(${d.node.x - d.node.r + dX}px, ${
          d.node.y - d.node.r + dY
        }px)`
      })

      const target = getTargetNodeData(dragTargets.current, event, graph)

      if (target !== dragTarget.current) {
        dragTarget.current?.element.classList.remove('drag-target')
        if (target) {
          dragTarget.current = target
          target.element.classList.add('drag-target')
        }
      }
    },
    [graph]
  )

  // Cleanup event listeners on unmount
  useEffect(
    () => () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousemove', handleMouseMove)
    },
    [graph]
  )

  return {
    canDrag,
    handleMouseDown,
  }
}

function getNodeElement(node: NodeData) {
  return document.getElementById(`node-${node.data.id}`) as HTMLDivElement
}

function getTargetNodeData(
  targetNodes: DragNode[],
  event: MouseEvent,
  graph: Graph
): DragNode | null {
  const position = getDragEventPosition(event, graph)

  // Get circles under the mouse
  const currentTargets = targetNodes.filter(({ node }) =>
    isPointInsideCircle(position.x, position.y, node.x, node.y, node.r)
  )

  // Get last descendants under the mouse
  return (
    currentTargets.reduce<{ max: number; dragNode?: DragNode }>(
      (acc, dragNode) =>
        !dragNode || dragNode.node.depth > acc.max
          ? { max: dragNode.node.depth, dragNode }
          : acc,
      { max: 0 }
    ).dragNode || null
  )
}

function getDragEventPosition(event: MouseEvent, graph: Graph) {
  const { x, y, k } = graph.zoomTransform
  const graphRect = (graph.element as HTMLDivElement).getBoundingClientRect()

  return {
    x: (event.clientX - graphRect.left - x) / k,
    y: (event.clientY - graphRect.top - y) / k,
  }
}
