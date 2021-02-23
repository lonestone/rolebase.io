import * as d3 from 'd3'
import { BaseType, D3DragEvent, HierarchyCircularNode, Selection } from 'd3'
import { CircleEntry, CircleMemberEntry } from '../data/circles'
import { MemberEntry } from '../data/members'
import { RoleEntry } from '../data/roles'

// https://observablehq.com/@d3/circle-packing
// https://observablehq.com/@d3/zoomable-circle-packing
// https://wattenberger.com/blog/react-and-d3

enum NodeType {
  Circle = 'Circle',
  MembersCircle = 'MembersCircle',
  Member = 'Member',
}

type NodeData = HierarchyCircularNode<Data>
type NodesSelection = Selection<SVGGElement, NodeData, BaseType, unknown>

const circlesSettings = {
  memberValue: 10,
  padding: {
    circle: 50,
    member: 1,
  },
  highlight: {
    duration: 150,
    increaseRadius: 5,
  },
  move: {
    duration: 500,
  },
}

interface Data {
  id: string
  memberId?: string
  parentCircleId: string | null
  name: string
  type: NodeType
  value?: number
  children?: Array<Data>
}

function circlesToD3Data(
  circles: CircleEntry[],
  roles: RoleEntry[],
  members: MemberEntry[],
  parentId: string | null = null
): Data[] {
  return circles
    .filter((circle) => circle.parentId == parentId)
    .map((circle) => {
      // Define circle data with role name
      const data: Data = {
        id: circle.id,
        parentCircleId: circle.parentId,
        name: roles.find((role) => role.id === circle.roleId)?.name || '?',
        type: NodeType.Circle,
      }

      // Add sub-circles to children
      const children: Data[] = circlesToD3Data(
        circles,
        roles,
        members,
        circle.id
      )

      // Add members in a circle to group them
      if (circle.members.length !== 0 || children.length === 0) {
        children.push(memberstoD3Data(members, circle.id, circle.members))
      }

      // Set children if there is at least one
      if (children.length !== 0) {
        data.children = children
      }
      return data
    })
}

function memberstoD3Data(
  members: MemberEntry[],
  circleId: string,
  circleMembers: CircleMemberEntry[]
): Data {
  const node: Data = {
    id: `${circleId}-members`,
    parentCircleId: circleId,
    name: '',
    type: NodeType.MembersCircle,
  }
  if (circleMembers.length === 0) {
    node.value = circlesSettings.memberValue
  } else {
    node.children = circleMembers.map((entry) => ({
      id: entry.id,
      memberId: entry.memberId,
      parentCircleId: circleId,
      name: members.find((member) => member.id === entry.memberId)?.name || '?',
      value: circlesSettings.memberValue,
      type: NodeType.Member,
    }))
  }
  return node
}

function packData(data: Data, width: number, height: number) {
  const hierarchyNode = d3
    .hierarchy(data)
    .sum((d) => d.value || 0)
    .sort((a, b) => (b.value || 0) - (a.value || 0))
  return d3
    .pack<Data>()
    .size([width, height])
    .padding((d) =>
      d.data.type === NodeType.Circle
        ? circlesSettings.padding.circle
        : circlesSettings.padding.member
    )(hierarchyNode)
}

function isPointInsideCircle(
  pointX: number,
  pointY: number,
  centerX: number,
  centerY: number,
  radius: number
) {
  return (
    (pointX - centerX) * (pointX - centerX) +
      (pointY - centerY) * (pointY - centerY) <
    radius * radius
  )
}

function highlightCircle(
  selection: NodesSelection,
  fade = false,
  stroke = false
) {
  const circle = selection
    .select('circle')
    .transition()
    .duration(circlesSettings.highlight.duration)
    .attr('r', (d) => d.r + circlesSettings.highlight.increaseRadius)
  if (fade) {
    circle.attr('opacity', 0.7)
  }
  if (stroke) {
    circle.attr('stroke', 'rgba(1,1,1,0.5)')
  }
}
function unhighlightCircle(selection: NodesSelection, instant?: boolean) {
  const circle = selection.select('circle')
  if (instant) {
    circle
      .attr('r', (d) => d.r)
      .attr('opacity', 1)
      .attr('stroke', 'none')
  } else {
    circle
      .transition()
      .duration(instant ? 0 : circlesSettings.highlight.duration)
      .attr('r', (d) => d.r)
      .attr('opacity', 1)
      .attr('stroke', 'none')
  }
}

function getTargetNodeData(
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

function getNodeColor(node: NodeData) {
  if (node.data.type === NodeType.Circle) return color(node.depth.toString())
  if (node.data.type === NodeType.MembersCircle) return 'transparent'
  return 'white'
}

const color = d3.scaleOrdinal(d3.schemeSet3)

export function initGraph(svgElement: SVGSVGElement) {
  const svg = d3.select(svgElement)
  const svgId = svg.attr('id')

  // Shadow filter
  svg
    .append('filter')
    .attr('id', `${svgId}-shadow`)
    .append('feDropShadow')
    .attr('flood-opacity', 0.3)
    .attr('dx', 0)
    .attr('dy', 1)
}

interface DragParams {
  circles: CircleEntry[]
  roles: RoleEntry[]
  members: MemberEntry[]
  width: number
  height: number
  onCircleMove?(circleId: string, targetCircleId: string | null): boolean
  onMemberMove?(
    memberId: string,
    parentCircleId: string,
    targetCircleId: string | null
  ): boolean
}

export function updateGraph(
  svgElement: SVGSVGElement,
  {
    circles,
    roles,
    members,
    width,
    height,
    onCircleMove,
    onMemberMove,
  }: DragParams
) {
  // Pack data with d3.pack
  const data: Data = {
    id: 'root',
    parentCircleId: null,
    type: NodeType.Circle,
    name: '',
    children: circlesToD3Data(circles, roles, members),
  }
  const root = packData(data, width, height)
  const svg = d3.select(svgElement)
  const svgId = svg.attr('id')

  // Variables for dragging circles and members
  const dragOrigin = { x: 0, y: 0 }
  let dragNode: NodeData | undefined
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

        // Add circle shapes
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
          .attr('x', 0)
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
            d3.select(this) //.attr('stroke', '#000')
              .attr('filter', `url(#${svgId}-shadow)`)
          })
          .on('mouseout', function () {
            d3.select(this) //.attr('stroke', null)
              .attr('filter', `none`)
          })

          // Click
          .on('click', (event, d) => console.log(event, d))

          // Drag
          .call(
            d3
              .drag<SVGGElement, NodeData>()
              .on('start', function (event, d) {
                dragNode = d
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
                let moved = false

                if (dragTargets && dragTarget !== undefined) {
                  const targetCircleId = dragTarget?.data.id || null

                  // Move to another circle
                  if (
                    dragNode &&
                    dragNode.data.parentCircleId !== targetCircleId
                  ) {
                    if (dragNode.data.type === NodeType.Circle) {
                      moved =
                        onCircleMove?.(dragNode.data.id, targetCircleId) ||
                        false
                    }
                    if (
                      dragNode.data.type === NodeType.Member &&
                      dragNode.data.parentCircleId &&
                      dragNode.data.memberId
                    ) {
                      moved =
                        onMemberMove?.(
                          dragNode.data.memberId,
                          dragNode.data.parentCircleId,
                          targetCircleId
                        ) || false
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
                unhighlightCircle(d3.select<SVGGElement, NodeData>(this), moved)

                // Reset circles positions
                if (dragNodes && !moved) {
                  dragNodes.attr('transform', (d) => `translate(${d.x},${d.y})`)
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
        nodeUpdate
          .transition()
          .duration(circlesSettings.move.duration)
          .attr('transform', (d) => `translate(${d.x},${d.y})`)

        // Update circle
        nodeUpdate
          .select('circle')
          .transition()
          .duration(circlesSettings.move.duration)
          .attr('r', (d) => d.r)
          .attr('fill', getNodeColor)
          .attr('stroke', 'none')

        // Update circle name
        nodeUpdate
          .filter((d) => d.data.type === NodeType.Circle)
          .select('text')
          .text((d) => d.data.name)
          .transition()
          .duration(circlesSettings.move.duration)
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
}
