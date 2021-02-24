import * as d3 from 'd3'

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
