import * as d3 from 'd3'
import { CircleEntry } from '../data/circles'
import { MemberEntry } from '../data/members'
import { RoleEntry } from '../data/roles'
import { circlesToD3Data, fixLostCircles } from './data'
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
import { Data, NodeData, NodesSelection, NodeType } from './types'
import { GraphEvents } from './updateGraph'

interface CirclesParams {
  circles: CircleEntry[]
  roles: RoleEntry[]
  members: MemberEntry[]
  width: number
  height: number
  events: GraphEvents
}

export default function updateCircles(
  svgElement: SVGSVGElement,
  { circles, roles, members, width, height, events }: CirclesParams
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

  // Variables for dragging circles and members
  const dragOrigin = { x: 0, y: 0 }
  let dragNodes: NodesSelection | undefined
  let dragTarget: NodeData | null | undefined
  let dragTargets: NodesSelection | undefined

  // Add circle groups
  const nodesMap = root.descendants().slice(1)

  selectAppend(svg, 'g', 'circles')
    .selectAll('.circle')
    .data(nodesMap, (d: any) => d.data.id)
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
          .attr('r', 0)
          .attr('opacity', 1)
          .attr('fill', (d) => getNodeColor(d.data.type, d.depth))
          .attr('cursor', 'pointer')
          .transition(transition as any)
          .attr('r', (d) => d.r)

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
          .attr('y', (d) => -d.r + 17)

        // Add member name
        nodeGroup
          .filter((d) => d.data.type === NodeType.Member)
          .append('text')
          .attr('opacity', 0)
          .attr('y', '0.5em')
          .text((d) => d.data.name)
          .attr('pointer-events', 'none')
          .transition(transition as any)
          .attr('opacity', 1)

        // Add events
        nodeGroup
          .filter(
            (d) =>
              d.data.type === NodeType.Circle || d.data.type === NodeType.Member
          )
          // Hover
          .on('mouseover', function () {
            d3.select(this).attr('filter', `url(#${svgId}-shadow)`)
          })
          .on('mouseout', function () {
            d3.select(this).attr('filter', `none`)
          })

          // Drag
          .call(
            d3
              .drag<SVGGElement, NodeData>()
              .filter(function () {
                // Allow Ctrl+drag
                return true
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

                  const targetData = getTargetNodeData(dragTargets, event)

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
                  if (dragNode.data.type === NodeType.Circle) {
                    events.onCircleClick?.(dragNode.data.id)
                  } else if (
                    dragNode.data.type === NodeType.Member &&
                    dragNode.data.parentCircleId
                  ) {
                    events.onCircleMemberClick?.(
                      dragNode.data.parentCircleId,
                      dragNode.data.id
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
          .attr('y', (d) => -d.r + 17)

        // Update member name
        nodeUpdate
          .filter((d) => d.data.type === NodeType.Member)
          .select('text')
          .text((d) => d.data.name)

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
}
