import { HierarchyCircularNode } from 'd3-hierarchy'
import { Data } from './types'

export const d3CircleName = (
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
      getFontSize(d, i, nodes) > 2 ? getOpacity(d) : 0
    )
    .attr('font-size', (d, i, nodes) => `${getFontSize(d, i, nodes)}em`)
}

// Opacity depends on zoom scale and node depth
// Equation: -20 * (x - 1 / 5 - 0.2)^2 + 1.2
// Graph: https://www.desmos.com/calculator/sd6gxuojqg
function getOpacity(data: HierarchyCircularNode<Data>) {
  return `clamp(0, calc(
    -20
      * (var(--zoom-scale) - ${data.depth} / 5 - 0.2)
      * (var(--zoom-scale) - ${data.depth} / 5 - 0.2)
      + 1.2
  ), 1)`
}

function getFontSize(
  data: HierarchyCircularNode<Data>,
  index: number,
  nodes: SVGTextElement[] | ArrayLike<SVGTextElement>
) {
  return (data.r * 2 * 0.9) / nodes[index].getBBox().width
}
