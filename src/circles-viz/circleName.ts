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
    .attr('alignment-baseline', 'hanging')
    .attr('font-size', getTopFontSize)
    .attr('opacity', getTopNameOpacity)
}

// Opacity depends on zoom scale, circle size and graph size
// Visible when:
// - circle is smaller than 2/3 of graph size
// - parent is not visible
// - zoom less than 1
function getCenterNameOpacity(data: NodeData) {
  return `min(
    clamp(0,
      1 - (var(--zoom-scale) * ${data.r * 2} - var(--graph-min-size) * 2/3)
        / 100
      , 1),
    ${
      // Inverse of parent opacity
      data.parent?.data.id === 'root'
        ? ''
        : `clamp(0,
        (var(--zoom-scale) * ${
          (data.parent?.r || 0) * 2
        } - var(--graph-min-size) * 2/3)
          / 100 - 1
        , 1),`
    }
    clamp(0, (1 - var(--zoom-scale)) + 1, 1)
  )`
}

// Opacity depends on zoom scale and node depth
function getTopNameOpacity(data: NodeData) {
  // return `clamp(0, calc(
  //   5 * (var(--zoom-scale) - ${data.depth} / 5 - 0.3)
  // ), 1)`
  return `max(
    clamp(0,
      (var(--zoom-scale) * ${data.r * 2} - var(--graph-min-size) * 2/3)
        / 100 - 0.5
      , 1),
    clamp(0, var(--zoom-scale) - 1 - 0.5, 1)
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
