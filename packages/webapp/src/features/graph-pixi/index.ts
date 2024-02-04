import { AllCirclesGraph } from './graphs/AllCirclesGraph'
import { FlatCircleGraph } from './graphs/FlatCircleGraph'
import { MembersGraph } from './graphs/MembersGraph'
import { SimpleCirclesGraph } from './graphs/SimpleCirclesGraph'
import { GraphParams, GraphViews } from './types'

export function getGraphInstance(
  view: GraphViews,
  canvas: HTMLCanvasElement,
  params: GraphParams
) {
  switch (view) {
    case GraphViews.AllCircles:
      return new AllCirclesGraph(canvas, params)
    case GraphViews.SimpleCircles:
      return new SimpleCirclesGraph(canvas, params)
    case GraphViews.FlatCircle:
      return new FlatCircleGraph(canvas, params)
    case GraphViews.Members:
      return new MembersGraph(canvas, params)
    default:
      throw new Error(`Unknown graph view type: ${view}`)
  }
}
