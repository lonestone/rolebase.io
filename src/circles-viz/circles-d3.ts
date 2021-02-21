import * as d3 from 'd3'
import { CircleEntry } from '../data/circles'
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

const circlesSettings = {
  memberValue: 10,
  circlePadding: 50,
  memberPadding: 1,
}

interface Data {
  id: string
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
      if (circle.membersIds.length !== 0) {
        children.push({
          id: `${circle.id}-members`,
          name: '',
          type: NodeType.MembersCircle,
          children: memberstoD3Data(members, circle.id, circle.membersIds),
        })
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
  membersIds: string[]
): Data[] {
  return membersIds.map((memberId) => ({
    id: `${circleId}-${memberId}`,
    name: members.find((member) => member.id === memberId)?.name || '?',
    value: circlesSettings.memberValue,
    type: NodeType.Member,
  }))
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
        ? circlesSettings.circlePadding
        : circlesSettings.memberPadding
    )(hierarchyNode)
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

export function updateGraph(
  svgElement: SVGSVGElement,
  circles: CircleEntry[],
  roles: RoleEntry[],
  members: MemberEntry[],
  width: number,
  height: number
) {
  const data: Data = {
    id: 'root',
    type: NodeType.Circle,
    name: '',
    children: circlesToD3Data(circles, roles, members),
  }
  const root = packData(data, width, height)
  const svg = d3.select(svgElement)
  const svgId = svg.attr('id')

  // Add circle groups
  const nodesMap = root.descendants().slice(1)
  svg
    .selectAll('.circle')
    .data(nodesMap)
    .join(
      (nodeEnter) => {
        const nodeGroup = nodeEnter
          .append('g')
          .attr('id', (d) => `${svgId}-circle-${d.data.id}`)
          .attr('class', 'circle')
          .attr('transform', (d) => `translate(${d.x},${d.y})`)

        // Add circle shapes
        nodeGroup
          .append('circle')
          .attr('r', (d) => d.r)
          .attr('fill', (d) => {
            if (d.data.type === NodeType.Circle)
              return color(d.depth.toString())
            if (d.data.type === NodeType.MembersCircle) return 'transparent'
            return 'white'
          })
          .attr('cursor', 'pointer')

        const ciclesLeaf = nodeGroup.filter(
          (d) => d.data.type === NodeType.Circle
        )
        const membersLeaf = nodeGroup.filter(
          (d) => d.data.type === NodeType.Member
        )

        // Add circle name
        ciclesLeaf
          .append('text')
          .attr('y', (d) => -d.r + 20)
          .attr('font-weight', 'bold')
          .text((d) => d.data.name)
          .attr('pointer-events', 'none')

        // Add members events
        membersLeaf
          .on('mouseover', function () {
            d3.select(this) //.attr('stroke', '#000')
              .attr('filter', `url(#${svgId}-shadow)`)
          })
          .on('mouseout', function () {
            d3.select(this) //.attr('stroke', null)
              .attr('filter', `none`)
          })
          .on('click', (event, d) => console.log(event, d))

        // Add member name
        membersLeaf
          .append('text')
          .attr('x', 0)
          .attr('y', '0.7em')
          .text((d) => d.data.name)
          .attr('pointer-events', 'none')

        return nodeGroup
      },
      (nodeUpdate) => {
        // Update circle
        nodeUpdate.select('circle').attr('r', (d) => d.r)
        // Update position
        return nodeUpdate.attr('transform', (d) => `translate(${d.x},${d.y})`)
      },
      (nodeExit) => nodeExit.remove()
    )
}
