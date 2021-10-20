import * as d3 from 'd3'
import { HierarchyCircularNode } from 'd3'
import { CircleEntry } from '../api/entities/circles'
import { MemberEntry } from '../api/entities/members'
import { RoleEntry } from '../api/entities/roles'
import { d3CircleName } from './circleName'
import { GraphEvents } from './createGraph'
import { circlesToD3Data, fixLostCircles } from './data'
import { getFirstname } from './getFirstname'
import { getNodeColor } from './getNodeColor'
import { getTargetNodeData } from './getTargetNodeData'
import {
  getHighlightTransition,
  highlightCircle,
  unhighlightCircle,
} from './highlightCircle'
import { packData } from './packData'
import selectAppend from './selectAppend'
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
  {
    dimensions,
    circles,
    roles,
    members,
    events,
    zoom,
    addDrawListener,
  }: CirclesParams
) {
  // Pack data with d3.pack
  const data: Data = {
    id: 'root',
    parentCircleId: null,
    type: NodeType.Circle,
    name: '',
    children: circlesToD3Data(fixLostCircles(circles), roles, members),
  }
  const root = packData(data, 2000, 2000)
  const svg = d3.select<SVGSVGElement, NodeData>(svgElement)
  const svgId = svg.attr('id')
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
  const maxDepth = nodesMap.reduce(
    (max, node) => (node.depth > max ? node.depth : max),
    0
  )
  const getCircleFontSize = (node: NodeData) =>
    settings.fontSize + (maxDepth / node.depth) * 2

  // Set focus functions
  const focusCircle = (
    node: NodeData,
    adaptScale?: boolean,
    instant?: boolean
  ) => {
    if (node.r > 0) {
      zoom.to(node.x, node.y, adaptScale ? node.r + 40 : 0, instant)
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
          .attr('class', 'circle')
          .attr('transform', (d) => `translate(${d.x},${d.y})`)

          // Hover
          .on('mouseover', function () {
            const g = d3.select<SVGGElement, NodeData>(this)

            // Add circle border
            if (!dragNodes) {
              highlightCircle(g, {
                instant: true,
                strokeWidth: 3,
                strokeColor: 'hsl(170deg 50% 30%)',
              })
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
              unhighlightCircle(g, {
                instant: true,
              })
            }

            // Hide member name
            g.filter((d) => d.data.type === NodeType.Member)
              .select('text')
              .attr('opacity', (d) => (d.data.picture ? 0 : 1))
          })

        // No events on members group
        nodeGroup
          .filter((d) => d.data.type === NodeType.MembersCircle)
          .attr('pointer-events', 'none')

        // Add circle shape
        nodeGroup
          .append('circle')
          .attr('id', (d) => `circle-${d.data.id}`)
          .attr('r', (d) => d.r)
          .attr('fill', (d) => getNodeColor(d.data.type, d.depth))
          .attr('cursor', 'pointer')
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
          .attr('font-weight', 'bold')
          .attr('font-size', (d) => `${getCircleFontSize(d)}px`)
          .attr('cursor', 'pointer')
          .attr('y', (d) => -d.r - 10)

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
          .attr('font-size', `${settings.fontSize}px`)
          .attr('y', '0.5em')
          .text((d) => getFirstname(d.data.name))
          .attr('opacity', (d) => (d.data.picture ? 0 : 1))
          .attr('pointer-events', 'none')
          .attr('font-weight', 'bold')
          .attr('paint-order', 'stroke')
          .attr('stroke', 'white')
          .attr('stroke-width', '2px')
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
                highlightCircle(d3.select(this), {
                  filter: `url(#${svgId}-shadow)`,
                })
              })
              .on('drag', function (event, dragNode) {
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
                    const transition = getHighlightTransition()

                    // Unhighlight previously targeted circle
                    unhighlightCircle(
                      dragTargets.filter((node) => node === dragTarget),
                      { transition }
                    )
                    // Highlight newly targeted circle
                    highlightCircle(
                      dragTargets.filter((node) => node === targetData),
                      { strokeWidth: 5, transition }
                    )
                    // Change color of dragged circle
                    dragNodes
                      .select('circle')
                      .transition(transition as any)
                      .attr('fill', (d) =>
                        getNodeColor(
                          d.data.type,
                          (targetData ? targetData.depth : 0) +
                            d.depth -
                            dragNode.depth +
                            1
                        )
                      )
                    dragTarget = targetData
                  }
                }
              })
              .on('end', function (event, dragNode) {
                const { shiftKey } = event.sourceEvent
                const transition = getHighlightTransition()

                // Drag end
                let actionMoved = false
                if (dragTargets && dragTarget !== undefined) {
                  const targetCircleId = dragTarget?.data.id || null

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
                    differentParent
                  ) {
                    if (shiftKey) {
                      if (targetCircleId) {
                        events.onMemberAdd?.(
                          dragNode.data.memberId,
                          targetCircleId
                        )
                        focusCircleAfterDraw(targetCircleId)
                      }
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
                    unhighlightCircle(
                      dragTargets.filter((node) => node === dragTarget),
                      { instant: actionMoved, transition }
                    )
                  }
                }

                // Reset moved circle
                unhighlightCircle(d3.select(this), {
                  transition,
                  instant: actionMoved,
                })

                // Reset dragged circles
                if (dragNodes && !actionMoved) {
                  dragNodes
                    .transition(transition as any)
                    .attr('transform', (d) => `translate(${d.x},${d.y})`)
                    .select('circle')
                    .attr('fill', (d) => getNodeColor(d.data.type, d.depth))

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

        // Update position
        nodeUpdate
          .transition(transition as any)
          .attr('transform', (d) => `translate(${d.x},${d.y})`)

        // Update circle style
        nodeUpdate
          .select('circle')
          .transition(transition as any)
          .attr('r', (d) => d.r)
          .attr('fill', (d) => getNodeColor(d.data.type, d.depth))
          .attr('opacity', 1)
          .attr('stroke', 'none')

        // Update circle name
        nodeUpdate
          .filter((d) => d.data.type === NodeType.Circle)
          .select('text')
          .text((d) => d.data.name)
          .transition(transition as any)
          .attr('font-size', (d) => `${getCircleFontSize(d)}px`)
          .attr('y', (d) => -d.r - 10)

        // Update member name
        const nodeUpdateMembers = nodeUpdate.filter(
          (d) => d.data.type === NodeType.Member
        )
        nodeUpdateMembers
          .select('text')
          .attr('font-size', `${settings.fontSize}px`)
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
          .attr('font-weight', 'bold')
          .attr('pointer-events', 'none')
          .attr('y', 0)
          .attr('alignment-baseline', 'middle')
          .call(d3CircleName)

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
          .call(d3CircleName)
        return nodeUpdate
      },
      (nodeExit) => nodeExit.remove()
    )
}
