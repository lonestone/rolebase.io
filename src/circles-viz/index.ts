import { AllCirclesGraph } from './graphs/AllCirclesGraph'
import { FlatCircleGraph } from './graphs/FlatCircleGraph'
import { MembersGraph } from './graphs/MembersGraph'
import { SimpleCirclesGraph } from './graphs/SimpleCirclesGraph'
import { GraphParams, GraphViews } from './types'

export function getGraphInstance(
  view: GraphViews,
  svg: SVGSVGElement,
  params: GraphParams
) {
  switch (view) {
    case GraphViews.AllCircles:
      return new AllCirclesGraph(svg, params)
    case GraphViews.SimpleCircles:
      return new SimpleCirclesGraph(svg, params)
    case GraphViews.FlatCircle:
      return new FlatCircleGraph(svg, params)
    case GraphViews.Members:
      return new MembersGraph(svg, params)
    default:
      throw new Error(`Unknown graph view type: ${view}`)
  }
}
