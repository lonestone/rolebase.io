import * as d3 from 'd3'
import { CircleEntry } from '../api/entities/circles'
import { MemberEntry } from '../api/entities/members'
import { RoleEntry } from '../api/entities/roles'
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
  DrawEventListener,
  NodeData,
  NodesSelection,
  NodeType,
  Zoom,
} from './types'

interface CirclesParams {
  circles: CircleEntry[]
  roles: RoleEntry[]
  members: MemberEntry[]
  width: number
  height: number
  events: GraphEvents
  zoom: Zoom
  addDrawListener: DrawEventListener
}

export default function updateCircles(
  svgElement: SVGSVGElement,
  {
    circles,
    roles,
    members,
    width,
    height,
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
  const root = packData(data, width, height)
  const svg = d3.select(svgElement)
  const svgId = svg.attr('id')
  const firstDraw = !svg.select('.circles').node()

  // Variables for dragging circles and members
  const dragOrigin = { x: 0, y: 0 }
  let dragNodes: NodesSelection | undefined
  let dragTarget: NodeData | null | undefined
  let dragTargets: NodesSelection | undefined

  // Add circle once in panzoom
  const groupSelection = selectAppend(svg.select('.panzoom'), 'g', 'circles')

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
      zoom.to(node.x, node.y, adaptScale ? node.r : 0, instant)
    }
  }

  zoom.focusCircle = (circleId, adaptScale, instant) => {
    const circle = nodesMap.find((c) => c.data.id === circleId)
    if (!circle) return
    zoom.to(circle.x, circle.y, adaptScale ? circle.r : 0, instant)
  }

  // Zoom on root circle at first draw
  if (firstDraw) {
    focusCircle(root, true, true)
  }

  // Add circle groups
  groupSelection
    .selectAll('.circle')
    .data(nodesMap.slice(1), (d: any) => d.data.id)
    .join(
      // Create Circle
      (nodeEnter) => {
        const transition = d3
          .transition<Data>()
          .duration(settings.move.duration)
          .ease(settings.move.transition)

        const nodeGroup = nodeEnter
          .append('g')
          .attr('class', 'circle')
          .attr('transform', (d) => `translate(${d.x},${d.y})`)

        // No events on members group
        nodeGroup
          .filter((d) => d.data.type === NodeType.MembersCircle)
          .attr('pointer-events', 'none')

        // Add circle shape
        nodeGroup
          .append('circle')
          .attr('id', (d) => `circle-${d.data.id}`)
          .attr('r', 0)
          .attr('opacity', 1)
          .attr('fill', (d) => getNodeColor(d.data.type, d.depth))
          .attr('cursor', 'pointer')
          // Hover
          .on('mouseover', function () {
            d3.select(this).attr('filter', `url(#${svgId}-shadow)`)
          })
          .on('mouseout', function () {
            d3.select(this).attr('filter', `none`)
          })
          // Animate radius
          .transition(transition as any)
          .attr('r', (d) => d.r)

        // Add clip-path with circle
        nodeGroup
          .append('clipPath')
          .attr('id', (d) => `clip-${d.data.id}`)
          .append('use')
          .attr('xlink:href', (d) => `#circle-${d.data.id}`)

        // Add circle name
        nodeGroup
          .filter((d) => d.data.type === NodeType.Circle)
          .append('text')
          .attr('font-weight', 'bold')
          .text((d) => d.data.name)
          .attr('pointer-events', 'none')
          .attr('opacity', 0)
          .attr('y', 0)
          .transition(transition as any)
          .attr('opacity', 1)
          .attr('font-size', (d) => `${getCircleFontSize(d)}px`)
          .attr('y', (d) => -d.r - 10)

        // Add member name
        const nodeGroupMembers = nodeGroup.filter(
          (d) => d.data.type === NodeType.Member
        )
        nodeGroupMembers
          .append('text')
          .attr('font-size', `${settings.fontSize}px`)
          .attr('opacity', 0)
          .attr('y', '0.5em')
          .text((d) => getFirstname(d.data.name))
          .attr('pointer-events', 'none')
          .transition(transition as any)
          .attr('opacity', (d) => (d.data.picture ? 0 : 1))

        // Add member picture
        nodeGroupMembers
          .append('image')
          .attr('pointer-events', 'none')
          .attr('xlink:href', (d) => d.data.picture || '')
          .attr('clip-path', (d) => `url(#clip-${d.data.id})`)
          .attr('x', (d) => -d.r)
          .attr('y', (d) => -d.r)
          .attr('height', (d) => d.r * 2)
          .attr('width', (d) => d.r * 2)

        // Add events
        nodeGroup
          .filter(
            (d) =>
              d.data.type === NodeType.Circle || d.data.type === NodeType.Member
          )

          // Drag
          .call(
            d3
              .drag<SVGGElement, NodeData>()
              .filter(function (event) {
                return (
                  // Disable drag when space key is pressed
                  !zoom.spaceKey &&
                  // Disable when mousewheel is pressed
                  event.button !== 1
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
                highlightCircle(d3.select(this), { fade: true })
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
                      { fade: false, stroke: true, transition }
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
                const { ctrlKey } = event.sourceEvent
                const clicked =
                  dragOrigin.x === event.x && dragOrigin.y === event.y
                const transition = getHighlightTransition()

                // Click
                if (clicked) {
                  // Zoom to node
                  focusCircle(dragNode, true)

                  if (dragNode.data.type === NodeType.Circle) {
                    // Click on circle
                    events.onCircleClick?.(dragNode.data.id)
                  } else if (
                    dragNode.data.type === NodeType.Member &&
                    dragNode.data.parentCircleId &&
                    dragNode.data.memberId
                  ) {
                    // Click on member
                    events.onCircleMemberClick?.(
                      dragNode.data.parentCircleId,
                      dragNode.data.memberId
                    )
                  }
                }

                // Drag end
                let actionMoved = false
                if (dragTargets && dragTarget !== undefined && !clicked) {
                  const targetCircleId = dragTarget?.data.id || null

                  // Move to another circle
                  const differentParent =
                    dragNode.data.parentCircleId !== targetCircleId
                  if (dragNode.data.type === NodeType.Circle) {
                    if (ctrlKey) {
                      events.onCircleCopy?.(dragNode.data.id, targetCircleId)
                    } else if (differentParent) {
                      events.onCircleMove?.(dragNode.data.id, targetCircleId)
                      addDrawListener(
                        () => zoom.focusCircle?.(dragNode.data.id),
                        true
                      )
                      actionMoved = true
                    }
                  } else if (
                    dragNode.data.type === NodeType.Member &&
                    dragNode.data.parentCircleId &&
                    dragNode.data.memberId &&
                    differentParent
                  ) {
                    if (ctrlKey) {
                      if (targetCircleId) {
                        events.onMemberAdd?.(
                          dragNode.data.memberId,
                          targetCircleId
                        )
                      }
                    } else {
                      events.onMemberMove?.(
                        dragNode.data.memberId,
                        dragNode.data.parentCircleId,
                        targetCircleId
                      )
                      addDrawListener(
                        () => zoom.focusCircle?.(dragNode.data.id),
                        true
                      )
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
}
