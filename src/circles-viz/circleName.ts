import * as d3 from 'd3'
import { NodeData } from './types'

export const d3CircleCenterName = (
  selection: d3.Selection<SVGTextElement, NodeData, SVGGElement, unknown>
) => {
  // Reset font-size, then apply opacity and font-size
  selection
    .attr('font-size', '1em')
    .attr('opacity', getCenterNameOpacity)
    .attr('font-size', getCenterFontSize)
}

export const d3CircleTopName = (
  selection: d3.Selection<SVGTextElement, NodeData, SVGGElement, unknown>
) => {
  // Reset font-size, then apply opacity and font-size
  selection
    .attr('y', (d) => -d.r + 2)
    .attr('font-size', getTopFontSize)
    .attr('opacity', getTopNameOpacity)
}

// Opacity depends on zoom scale, circle size and graph size
// Visible when:
// - zoom less than 1
// - circle is smaller than 2/3 of graph size
// - parent is not visible
function getCenterNameOpacity(data: NodeData) {
  return `min(
    clamp(0, (1 - var(--zoom-scale) - 0.1) * 10, 1),
    clamp(0,
      1 - (var(--zoom-scale) * ${
        data.r * 2
      } / var(--graph-min-size) - 2/3 + 0.1) * 10
      , 1),
    ${
      // Inverse of parent opacity
      data.parent && data.parent.data.id !== 'root'
        ? `clamp(0,
            (var(--zoom-scale) * ${
              data.parent.r * 2
            } / var(--graph-min-size) - 2/3) * 10
            , 1)`
        : '1'
    }
  )`
}

// Opacity depends on zoom scale and node depth
// Visible when:
// - zoom more than 1
// - circle is bigger than 2/3 of graph size
function getTopNameOpacity(data: NodeData) {
  return `max(
    clamp(0, (var(--zoom-scale) - 1) * 10 + 1, 1),
    clamp(0,
      (var(--zoom-scale) * ${data.r * 2} / var(--graph-min-size) - 2/3) * 10
      , 1)
  )`
}

function getCenterFontSize(
  data: NodeData,
  index: number,
  nodes: SVGTextElement[] | ArrayLike<SVGTextElement>
) {
  return `${(data.r * 2 * 0.9) / nodes[index].getBBox().width}em`
}

function getTopFontSize() {
  return `calc(12px / var(--zoom-scale) + var(--zoom-scale) * 1px)`
}
