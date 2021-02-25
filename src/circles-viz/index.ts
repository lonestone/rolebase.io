import * as d3 from 'd3'
import { CircleEntry } from '../data/circles'
import { MemberEntry } from '../data/members'
import { RoleEntry } from '../data/roles'
import { circlesToD3Data, fixLostCircles } from './data'
import { getNodeColor } from './getNodeColor'
import { getTargetNodeData } from './getTargetNodeData'
import { highlightCircle, unhighlightCircle } from './highlightCircle'
import { packData } from './packData'
import settings from './settings'
import { Data, NodeData, NodesSelection, NodeType } from './types'

interface DragParams {
  circles: CircleEntry[]
  roles: RoleEntry[]
  members: MemberEntry[]
  width: number
  height: number
  onCircleClick?(circleId: string): void
  onCircleMemberClick?(circleId: string, memberId: string): void
  onCircleMove?(circleId: string, targetCircleId: string | null): void
  onMemberMove?(
    memberId: string,
    parentCircleId: string,
    targetCircleId: string | null
  ): void
  onCircleAdd?(targetCircleId: string | null): void
  onMemberAdd?(memberId: string, targetCircleId: string): void
}

export function updateGraph(
  svgElement: SVGSVGElement,
  {
    circles,
    roles,
    members,
    width,
    height,
    onCircleClick,
    onCircleMemberClick,
    onCircleMove,
    onMemberMove,
    onCircleAdd,
    onMemberAdd,
  }: DragParams
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
  svg
    .selectAll('.circle')
    .data(nodesMap, (d: any) => d.data.id)
    .join(
      // Create Circle
      (nodeEnter) => {
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
          .attr('r', (d) => d.r)
          .attr('opacity', 1)
          .attr('fill', getNodeColor)
          .attr('cursor', 'pointer')

        // Add circle name
        nodeGroup
          .filter((d) => d.data.type === NodeType.Circle)
          .append('text')
          .attr('y', (d) => -d.r + 17)
          .attr('font-weight', 'bold')
          .text((d) => d.data.name)
          .attr('pointer-events', 'none')

        // Add member name
        nodeGroup
          .filter((d) => d.data.type === NodeType.Member)
          .append('text')
          .attr('y', '0.5em')
          .text((d) => d.data.name)
          .attr('pointer-events', 'none')

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
              .on('start', function (event, d) {
                // Register mouse position
                dragOrigin.x = event.x
                dragOrigin.y = event.y

                // Register selection of circles and its descendants
                const descendants = d.descendants()
                const circles = svg.selectAll<SVGGElement, NodeData>('.circle')
                dragNodes = circles
                  .filter((node) => descendants.includes(node))
                  .raise() // Put on top of everything
                dragTargets = circles.filter(
                  (node) => !descendants.includes(node)
                )

                // Highlight dragged circle
                highlightCircle(d3.select<SVGGElement, NodeData>(this), true)
              })
              .on('drag', function (event, d) {
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
                    // Unhighlight previously targeted circle
                    unhighlightCircle(
                      dragTargets.filter((node) => node === dragTarget)
                    )
                    // Highlight newly targeted circle
                    highlightCircle(
                      dragTargets.filter((node) => node === targetData),
                      false,
                      true
                    )
                    dragTarget = targetData
                  }
                }
              })
              .on('end', function (event, d) {
                // Click
                if (dragOrigin.x === event.x && dragOrigin.y === event.y) {
                  if (d.data.type === NodeType.Circle) {
                    onCircleClick?.(d.data.id)
                  } else if (
                    d.data.type === NodeType.Member &&
                    d.data.parentCircleId
                  ) {
                    onCircleMemberClick?.(d.data.parentCircleId, d.data.id)
                  }
                }

                // Drag end
                let moved = false
                if (dragTargets && dragTarget !== undefined) {
                  const targetCircleId = dragTarget?.data.id || null

                  // Move to another circle
                  if (d.data.parentCircleId !== targetCircleId) {
                    if (d.data.type === NodeType.Circle) {
                      onCircleMove?.(d.data.id, targetCircleId)
                      moved = true
                    } else if (
                      d.data.type === NodeType.Member &&
                      d.data.parentCircleId &&
                      d.data.memberId
                    ) {
                      onMemberMove?.(
                        d.data.memberId,
                        d.data.parentCircleId,
                        targetCircleId
                      )
                      moved = true
                    }
                  }

                  // Unhighlight target circle
                  if (dragTarget) {
                    unhighlightCircle(
                      dragTargets.filter((node) => node === dragTarget),
                      moved
                    )
                  }
                }

                // Reset moved circle
                unhighlightCircle(d3.select(this), moved)

                // Reset circles positions
                if (dragNodes && !moved) {
                  dragNodes
                    .transition()
                    .duration(settings.move.duration)
                    .ease(d3.easeCubicInOut)
                    .attr('transform', (d) => `translate(${d.x},${d.y})`)
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
          .ease(d3.easeCubicInOut)

        // Update position
        nodeUpdate
          .transition(transition as any)
          .attr('transform', (d) => `translate(${d.x},${d.y})`)

        // Update circle style
        nodeUpdate
          .select('circle')
          .transition(transition as any)
          .attr('r', (d) => d.r)
          .attr('fill', getNodeColor)
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
      (nodeExit) => nodeExit.remove()
    )

  // Menu to add circles and members
  const addMenuData = [{ id: 'new-circle', name: 'Cercle' }, ...members]
  svg
    .selectAll('.add-placeholder')
    .data(addMenuData, (d: any) => d.id)
    .join(
      // Create placeholder
      (nodeEnter) => {
        const nodeGroup = nodeEnter
          .append('g')
          .attr('class', 'add-placeholder')
          .attr('transform', (d, i) => `translate(50,${20 + i * 70})`)

        // Add circle shape
        nodeGroup
          .append('circle')
          .attr('r', 25)
          .attr('opacity', 1)
          .attr('fill', 'yellow')
          .attr('cursor', 'pointer')

        // Add member name
        nodeGroup
          .append('text')
          .attr('y', '0.5em')
          .text((d) => d.name)
          .attr('pointer-events', 'none')

        // Add events
        nodeGroup
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
              .drag<SVGGElement, MemberEntry>()
              .on('start', function (event, d) {
                d3.select(this).raise()
                // Register selection of all circles
                dragTargets = svg.selectAll<SVGGElement, NodeData>('.circle')
              })
              .on('drag', function (event, d) {
                if (dragTargets) {
                  // Move circle and its descendants
                  d3.select(this).attr(
                    'transform',
                    `translate(${event.x},${event.y})`
                  )

                  const targetData = getTargetNodeData(dragTargets, event)

                  if (targetData !== dragTarget) {
                    // Unhighlight previously targeted circle
                    unhighlightCircle(
                      dragTargets.filter((node) => node === dragTarget)
                    )
                    // Highlight newly targeted circle
                    highlightCircle(
                      dragTargets.filter((node) => node === targetData),
                      false,
                      true
                    )
                    dragTarget = targetData
                  }
                }
              })
              .on('end', function (event, d) {
                if (dragTargets && dragTarget !== undefined) {
                  const targetCircleId = dragTarget?.data.id || null

                  // Add to a circle
                  if (d.id === 'new-circle') {
                    onCircleAdd?.(targetCircleId) || false
                  } else if (targetCircleId) {
                    onMemberAdd?.(d.id, targetCircleId)
                  }

                  // Unhighlight target circle
                  if (dragTarget) {
                    unhighlightCircle(
                      dragTargets.filter((node) => node === dragTarget),
                      true
                    )
                  }
                }

                // Reset moved circle
                d3.select(this).attr(
                  'transform',
                  (d, i) => `translate(50,${20 + i * 70})`
                )

                dragTargets = undefined
                dragTarget = undefined
              })
          )

        return nodeGroup
      },

      // Update placeholder
      (nodeUpdate) => {
        // Update position
        nodeUpdate.attr('transform', (d, i) => `translate(50,${20 + i * 70})`)

        // Update style
        nodeUpdate.select('circle').attr('r', 25).attr('opacity', 1)

        // Update  name
        nodeUpdate.select('text').text((d) => d.name)

        // Update position
        return nodeUpdate
      },

      // Remove placeholder
      (nodeExit) => nodeExit.remove()
    )
}
