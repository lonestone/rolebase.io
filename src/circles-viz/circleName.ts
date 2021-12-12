import { HierarchyCircularNode } from 'd3-hierarchy'
import { Data, NodeData } from './types'

export const d3CircleCenterName = (
  selection: d3.Selection<
    SVGTextElement,
    d3.HierarchyCircularNode<Data>,
    SVGGElement,
    unknown
  >
) => {
  // Reset font-size, then apply opacity and font-size
  selection
    .attr('font-size', '1em')
    .attr('opacity', (d, i, nodes) =>
      getCenterFontSize(d, i, nodes) > 2 ? getCenterNameOpacity(d) : 0
    )
    .attr('font-size', (d, i, nodes) => `${getCenterFontSize(d, i, nodes)}em`)
}

export const d3CircleTopName =
  (maxDepth: number) =>
  (
    selection: d3.Selection<
      SVGTextElement,
      d3.HierarchyCircularNode<Data>,
      SVGGElement,
      unknown
    >
  ) => {
    // Reset font-size, then apply opacity and font-size
    selection
      .attr('y', (d) => -d.r + 1)
      .attr('alignment-baseline', 'hanging')
      .attr('font-size', (d) => `${getTopFontSize(d, maxDepth)}px`)
      .attr('opacity', (d, i, nodes) => getTopNameOpacity(d))
  }

// Opacity depends on zoom scale and node depth
// Equation: -20 * (x - depth / 5 - 0.2)^2 + 1.2
// Graph: https://www.desmos.com/calculator/sd6gxuojqg
function getCenterNameOpacity(data: HierarchyCircularNode<Data>) {
  return `clamp(0, calc(
    -20
      * (var(--zoom-scale) - ${data.depth} / 5 - 0.2)
      * (var(--zoom-scale) - ${data.depth} / 5 - 0.2)
      + 1.2
  ), 1)`
}

// Opacity depends on zoom scale and node depth
// Equation: 5 * (x - depth / 5 - 0.3)
// Graph: https://www.desmos.com/calculator/sd6gxuojqg
function getTopNameOpacity(data: HierarchyCircularNode<Data>) {
  return `clamp(0, calc(
    5
      * (var(--zoom-scale) - ${data.depth} / 5 - 0.3)
  ), 1)`
}

function getCenterFontSize(
  data: HierarchyCircularNode<Data>,
  index: number,
  nodes: SVGTextElement[] | ArrayLike<SVGTextElement>
) {
  return (data.r * 2 * 0.9) / nodes[index].getBBox().width
}

function getTopFontSize(node: NodeData, maxDepth: number) {
  return 5 + (maxDepth / node.depth) * 2
}
