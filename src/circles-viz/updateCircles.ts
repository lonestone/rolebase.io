import { CircleEntry } from '@shared/model/circle'
import { MemberEntry } from '@shared/model/member'
import { RoleEntry } from '@shared/model/role'
import * as d3 from 'd3'
import { HierarchyCircularNode } from 'd3'
import { d3CircleCenterName, d3CircleTopName } from './circleName'
import { GraphEvents } from './createGraph'
import { circlesToD3Data, fixLostCircles } from './data'
import { getFirstname } from './getFirstname'
import { getTargetNodeData } from './getTargetNodeData'
import { getHighlightTransition } from './highlightCircle'
import { packData } from './packData'
import selectAppend from './selectAppend'
import { setNodeCSSVariables } from './setNodeCSSVariables'
import settings from './settings'
import {
  Data,
  Dimensions,
  DrawEventListener,
  NodeData,
  NodesSelection,
  NodeType,
  Zoom,
} from './types'

interface CirclesParams {
  dimensions: Dimensions
  circles: CircleEntry[]
  roles: RoleEntry[]
  members: MemberEntry[]
  events: GraphEvents
  zoom: Zoom
  addDrawListener: DrawEventListener
}

export default function updateCircles(
  svgElement: SVGSVGElement,
  { circles, roles, members, events, zoom, addDrawListener }: CirclesParams
) {
  // Pack data with d3.pack
  const data: Data = {
    id: 'root',
    parentCircleId: null,
    type: NodeType.Circle,
    name: '',
    children: circlesToD3Data(fixLostCircles(circles), roles, members),
  }
  const root = packData(data)
  const svg = d3.select<SVGSVGElement, NodeData>(svgElement)
  const firstDraw = !svg.select('.circles').node()

  // Variables for dragging circles and members
  const dragOrigin = { x: 0, y: 0 }
  let dragNodes: NodesSelection | undefined
  let dragTarget: NodeData | null | undefined
  let dragTargets: NodesSelection | undefined

  // Get all nodes under root and rescale them
  const nodesMap = root.descendants()
  const minRadius = nodesMap.reduce(
    (min, node) => (node.r < min ? node.r : min),
    Infinity
  )
  const nodeScale = 30 / minRadius
  for (const node of nodesMap) {
    node.r *= nodeScale
    node.x *= nodeScale
    node.y *= nodeScale
  }

  // Set focus functions
  const focusCircle = (
    node: NodeData,
    adaptScale?: boolean,
    instant?: boolean
  ) => {
    if (node.r > 0) {
      zoom.to(
        node.x,
        node.y,
        adaptScale ? Math.max(100, node.r * 1.1) : 0,
        instant
      )
    }
  }

  // Change zoom extent
  zoom.changeExtent(root.r * 2, root.r * 2)

  // Set function to zoom on a circle
  zoom.focusCircle = (circleId, adaptScale, instant) => {
    const circle = nodesMap.find((c) => c.data.id === circleId)
    if (!circle) return
    focusCircle(circle, adaptScale, instant)
  }

  // Zoom on root circle at first draw
  if (firstDraw) {
    focusCircle(root, true, true)
  }

  function focusCircleAfterDraw(circleId?: string | null) {
    if (!circleId) return
    addDrawListener(
      () => setTimeout(() => zoom.focusCircle?.(circleId), 100),
      true
    )
  }

  const panzoomSelection = svg.select('.panzoom')

  // Add circle groups
  selectAppend(panzoomSelection, 'g', 'circles')
    .selectAll('.circle')
    .data(nodesMap.slice(1), (d: any) => d.data.id)
    .join(
      // Create Circle
      (nodeEnter) => {
        const nodeGroup = nodeEnter
          .append('g')
          .attr(
            'class',
            (d) => `circle circle-${d.data.id} type-${d.data.type}`
          )
          .attr('transform', (d) => `translate(${d.x},${d.y})`)

          // Hover
          .on('mouseover', function () {
            const g = d3.select<SVGGElement, NodeData>(this)

            // Add circle border
            if (!dragNodes) {
              g.attr('data-hover', '')
            }

            // Show member name if it's a member
            g.filter((d) => d.data.type === NodeType.Member)
              .select('text')
              .attr('opacity', 1)
          })
          .on('mouseout', function () {
            const g = d3.select<SVGGElement, NodeData>(this)
            // Remove circle border
            if (!dragNodes) {
              g.attr('data-hover', null)
            }

            // Hide member name
            g.filter((d) => d.data.type === NodeType.Member)
              .select('text')
              .attr('opacity', (d) => (d.data.picture ? 0 : 1))
          })

        // Set CSS variables
        setNodeCSSVariables(nodeGroup)

        // No events on members group
        nodeGroup
          .filter((d) => d.data.type === NodeType.MembersCircle)
          .attr('pointer-events', 'none')

        // Add circle shape
        nodeGroup
          .append('circle')
          .attr('id', (d) => `circle-${d.data.id}`)
          .attr('r', (d) => d.r)
          .attr('stroke-width', '0') // Init stroke-width for transitions

        // Add clip-path with circle
        nodeGroup
          .append('clipPath')
          .attr('id', (d) => `clip-${d.data.id}`)
          .append('use')
          .attr('href', (d) => `#circle-${d.data.id}`)

        // Add circle name at the top
        const nodeCircles = nodeGroup.filter(
          (d) => d.data.type === NodeType.Circle
        )
        nodeCircles
          .append('text')
          .text((d) => d.data.name)
          .attr('cursor', 'var(--circle-cursor)')
          .call(d3CircleTopName)

        // Add member picture
        const nodeMembers = nodeGroup.filter(
          (d) => d.data.type === NodeType.Member
        )
        nodeMembers
          .append('image')
          .attr('pointer-events', 'none')
          .attr('preserveAspectRatio', 'xMidYMid slice')
          .attr('href', (d) => d.data.picture || '')
          .attr('clip-path', (d) => `url(#clip-${d.data.id})`)
          .attr('x', (d) => -d.r)
          .attr('y', (d) => -d.r)
          .attr('height', (d) => d.r * 2)
          .attr('width', (d) => d.r * 2)

        // Add member name
        nodeMembers
          .append('text')
          .attr('font-size', `10px`)
          .attr('fill', 'white')
          .attr('y', '0.5em')
          .text((d) => getFirstname(d.data.name))
          .attr('opacity', (d) => (d.data.picture ? 0 : 1))
          .attr('pointer-events', 'none')
          .attr('paint-order', 'stroke')
          .attr('stroke-linecap', 'round')
          .attr('stroke-linejoin', 'round')

        // Add events
        nodeGroup
          .filter(
            (d) =>
              d.data.type === NodeType.Circle || d.data.type === NodeType.Member
          )

          // Click
          .on('click', (event, d: HierarchyCircularNode<Data>) => {
            if (d.data.type === NodeType.Circle) {
              // Click on circle
              events.onCircleClick?.(d.data.id)
            } else if (
              d.data.type === NodeType.Member &&
              d.data.parentCircleId &&
              d.data.memberId
            ) {
              // Click on member
              events.onCircleMemberClick?.(
                d.data.parentCircleId,
                d.data.memberId
              )
            }
          })

          // Drag
          .call(
            d3
              .drag<SVGGElement, NodeData>()
              .filter(function (event) {
                return (
                  // Disable drag when space key is pressed
                  !zoom.spaceKey &&
                  // Disable when mousewheel is pressed
                  event.button !== 1 &&
                  // Control/Command key is pressed
                  (event.ctrlKey || event.metaKey)
                )
              })
              .on('start', function (event, dragNode) {
                // Register mouse position
                dragOrigin.x = event.x
                dragOrigin.y = event.y

                // Register selection of circles and its descendants
                const descendants = dragNode.descendants()
                const circles = svg.selectAll<SVGGElement, NodeData>('.circle')
                dragNodes = circles
                  .filter((node) => descendants.includes(node))
                  .raise() // Put on top of everything
                dragTargets = circles.filter(
                  (node) => !descendants.includes(node)
                )

                // Highlight dragged circle
                d3.select(this).attr('data-dragging', '')
              })
              .on('drag', function (event) {
                const dX = event.x - dragOrigin.x
                const dY = event.y - dragOrigin.y
                if (dragNodes && dragTargets) {
                  // Move circle and its descendants
                  dragNodes.attr(
                    'transform',
                    (d) => `translate(${d.x + dX},${d.y + dY})`
                  )
                  // Move circles names
                  dragNodes.data().forEach((d) => {
                    svg
                      .select(`#circle-name-${d.data.id}`)
                      .attr(
                        'transform',
                        (d) => `translate(${d.x + dX},${d.y + dY})`
                      )
                  })

                  const targetData = getTargetNodeData(dragTargets, event, zoom)

                  if (targetData !== dragTarget) {
                    // Unhighlight previously targeted circle
                    dragTargets
                      .filter((node) => node === dragTarget)
                      .attr('data-drag-target', null)
                    // Highlight newly targeted circle
                    dragTargets
                      .filter((node) => node === targetData)
                      .attr('data-drag-target', '')

                    dragTarget = targetData
                  }
                }
              })
              .on('end', function (event, dragNode) {
                const shiftKey: boolean = event.sourceEvent.shiftKey
                const transition = getHighlightTransition()

                // Drag end
                let actionMoved = false
                if (dragTargets && dragTarget) {
                  const targetCircleId = dragTarget.data.id

                  // Move to another circle
                  const differentParent =
                    dragNode.data.parentCircleId !== targetCircleId
                  if (dragNode.data.type === NodeType.Circle) {
                    if (shiftKey) {
                      events.onCircleCopy?.(dragNode.data.id, targetCircleId)
                      focusCircleAfterDraw(targetCircleId)
                    } else if (differentParent) {
                      events.onCircleMove?.(dragNode.data.id, targetCircleId)
                      focusCircleAfterDraw(dragNode.data.id)
                      actionMoved = true
                    }
                  } else if (
                    dragNode.data.type === NodeType.Member &&
                    dragNode.data.parentCircleId &&
                    dragNode.data.memberId &&
                    differentParent &&
                    targetCircleId
                  ) {
                    if (shiftKey) {
                      events.onMemberAdd?.(
                        dragNode.data.memberId,
                        targetCircleId
                      )
                      focusCircleAfterDraw(targetCircleId)
                    } else {
                      events.onMemberMove?.(
                        dragNode.data.memberId,
                        dragNode.data.parentCircleId,
                        targetCircleId
                      )
                      focusCircleAfterDraw(dragNode.data.id)
                      actionMoved = true
                    }
                  }

                  // Unhighlight target circle
                  if (dragTarget) {
                    dragTargets
                      .filter((node) => node === dragTarget)
                      .attr('data-drag-target', null)
                  }
                }

                // Reset moved circle
                d3.select(this).attr('data-dragging', null)

                // Reset dragged circles
                if (dragNodes && !actionMoved) {
                  dragNodes
                    .transition(transition as any)
                    .attr('transform', (d) => `translate(${d.x},${d.y})`)
                    .select('circle')

                  // Reset circles names
                  dragNodes.data().forEach((d) => {
                    svg
                      .select(`#circle-name-${d.data.id}`)
                      .transition(transition as any)
                      .attr('transform', (d) => `translate(${d.x},${d.y})`)
                  })
                }

                dragNodes = undefined
                dragTargets = undefined
                dragTarget = undefined
              })
          )

        return nodeGroup
      },

      // Update Circle
      (nodeUpdate) => {
        const transition = d3
          .transition<Data>()
          .duration(settings.move.duration)
          .ease(settings.move.transition)

        // Set CSS variables
        setNodeCSSVariables(nodeUpdate as any)

        // Update position
        nodeUpdate
          .transition(transition as any)
          .attr('transform', (d) => `translate(${d.x},${d.y})`)

        // Update circle style
        nodeUpdate
          .select('circle')
          .transition(transition as any)
          .attr('r', (d) => d.r)
          .attr('opacity', 1)
          .attr('stroke', 'none')

        // Update circle name
        nodeUpdate
          .filter((d) => d.data.type === NodeType.Circle)
          .select<SVGTextElement>('text')
          .text((d) => d.data.name)
          .call(d3CircleTopName)

        // Update member name
        const nodeUpdateMembers = nodeUpdate.filter(
          (d) => d.data.type === NodeType.Member
        )
        nodeUpdateMembers
          .select('text')
          .text((d) => getFirstname(d.data.name))
          .attr('opacity', (d) => (d.data.picture ? 0 : 1))

        // Update member picture
        nodeUpdateMembers
          .select('image')
          .filter(
            (d, i, elements) =>
              (elements[i] as Element).getAttribute('href') !==
              (d.data.picture || '')
          )
          .attr('href', (d) => d.data.picture || '')

        // Update position
        return nodeUpdate
      },

      // Remove Circle
      (nodeExit) => {
        const transition = d3
          .transition<Data>()
          .duration(settings.remove.duration)
          .ease(settings.remove.transition)

        // Disappear
        nodeExit.transition(transition as any).remove()
        nodeExit
          .select('circle')
          .transition(transition as any)
          .attr('r', 0)
        nodeExit
          .select('text')
          .transition(transition as any)
          .attr('opacity', 0)
      }
    )

    // Sort by depth and Y, then raise
    .sort((a, b) =>
      a.depth === b.depth ? a.y - b.y : a.depth < b.depth ? -1 : 1
    )
    .raise()

  // Circles Names
  selectAppend(svg.select('.panzoom'), 'g', 'circles-names')
    .selectAll('.circle-name')
    .data(nodesMap.slice(1), (d: any) => d.data.id)
    .join(
      (nodeEnter) => {
        const nodeGroup = nodeEnter
          .filter((d) => d.data.type === NodeType.Circle)
          .append('g')
          .attr('id', (d) => `circle-name-${d.data.id}`)
          .attr('class', 'circle-name')
          .attr('transform', (d) => `translate(${d.x},${d.y})`)

        // Add circle name centered
        nodeGroup
          .append('text')
          .text((d) => d.data.name)
          .attr('pointer-events', 'none')
          .attr('y', 0)
          .attr('dominant-baseline', 'central')
          .call(d3CircleCenterName)

        return nodeGroup
      },
      (nodeUpdate) => {
        const transition = d3
          .transition<Data>()
          .duration(settings.move.duration)
          .ease(settings.move.transition)

        // Update position
        nodeUpdate
          .transition(transition as any)
          .attr('transform', (d) => `translate(${d.x},${d.y})`)

        // Update circle name
        nodeUpdate
          .select<SVGTextElement>('text')
          .text((d) => d.data.name)
          .call(d3CircleCenterName)
        return nodeUpdate
      },
      (nodeExit) => nodeExit.remove()
    )
}
