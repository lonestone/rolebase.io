import * as d3 from 'd3'
import { CircleEntry } from '../data/circles'
import { getRoleById, RoleEntry } from '../data/roles'

// https://observablehq.com/@d3/circle-packing
// https://wattenberger.com/blog/react-and-d3

interface Data {
  name: string
  value?: number
  children?: Array<Data>
  leafUid?: string
  clipUid?: string
}

function circlesToD3Data(
  circles: CircleEntry[],
  roles: RoleEntry[],
  parentId: string | null = null
): Data[] {
  return circles
    .filter((circle) => circle.parentId == parentId)
    .map((circle) => {
      const data: Data = {
        name: getRoleById(roles, circle.roleId).name,
      }
      const children = circlesToD3Data(circles, roles, circle.id).concat(
        memberstoD3Data(circle.membersIds)
      )
      if (children.length === 0) {
        data.value = 20
      } else {
        data.children = children
      }
      return data
    })
}

function memberstoD3Data(membersIds: string[]): Data[] {
  return membersIds.map((memberId) => ({ name: memberId, value: 20 }))
}

function packData(data: Data, width: number, height: number) {
  const hierarchyNode = d3
    .hierarchy(data)
    .sum((d) => d.value || 0)
    .sort((a, b) => (b.value || 0) - (a.value || 0))
  return d3.pack<Data>().size([width, height]).padding(3)(hierarchyNode)
}

const color = d3.scaleOrdinal(d3.schemeSet3)

export function initGraph(svgElement: SVGSVGElement) {
  const svg = d3.select(svgElement)

  // Shadow filter
  svg
    .append('filter')
    .attr('id', `${svg.attr('id')}-shadow`)
    .append('feDropShadow')
    .attr('flood-opacity', 0.3)
    .attr('dx', 0)
    .attr('dy', 1)
}

export function updateGraph(
  svgElement: SVGSVGElement,
  circles: CircleEntry[],
  roles: RoleEntry[],
  width: number,
  height: number
) {
  const data: Data = {
    name: '',
    children: circlesToD3Data(circles, roles),
  }
  const root = packData(data, width, height)
  const svg = d3.select(svgElement)

  const nodesMap = d3.group(root.descendants(), (d) => d.height)
  console.log(nodesMap)
  const node = svg
    .selectAll('g')
    .data(nodesMap)
    .join('g')
    .attr('filter', `url(#${svg.attr('id')}-shadow)`)
    .selectAll('g')
    .data((d) => d[1])
    .join('g')
    .attr('transform', (d) => `translate(${d.x + 1},${d.y + 1})`)

  node
    .append('circle')
    .attr('r', (d) => d.r)
    .attr('fill', (d) => color(d.height.toString()))

  const leaf = node.filter((d) => !d.children)
  let leafCount = 0
  let clipCount = 0

  leaf
    .select('circle')
    .attr(
      'id',
      (d) => (d.data.leafUid = `${svg.attr('id')}-leaf-${leafCount++}`)
    )

  leaf
    .append('clipPath')
    .attr(
      'id',
      (d) => (d.data.clipUid = `${svg.attr('id')}-clip-${clipCount++}`)
    )
    .append('use')
    .attr('xlink:href', (d) => `#${d.data.leafUid}`)

  // Show circle name
  leaf
    .append('text')
    .attr('clip-path', (d) => `url(#${d.data.clipUid}`)
    .append('tspan')
    .attr('x', 0)
    .attr('y', '0.7em')
    .text((d) => d.data.name)
}
