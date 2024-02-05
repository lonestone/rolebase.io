import { CircleFullFragment } from '@gql'
import { RefObject, useMemo } from 'react'
import { AllCirclesGraph } from '../graphs/AllCirclesGraph'
import { CirclesGraph } from '../graphs/CirclesGraph'
import { FlatCircleGraph } from '../graphs/FlatCircleGraph'
import { MembersGraph } from '../graphs/MembersGraph'
import { SimpleCirclesGraph } from '../graphs/SimpleCirclesGraph'
import { CirclesGraphViews, GraphParams, RootElement } from '../types'
import useGraph, { GraphProps } from './useGraph'

export interface CirclesGraphProps
  extends Omit<
    GraphProps<CircleFullFragment[], CirclesGraph>,
    'data' | 'init'
  > {
  view: CirclesGraphViews
  circles: CircleFullFragment[]
}

export default function useCirclesGraph(
  elementRef: RefObject<RootElement>,
  { view, circles, ...props }: CirclesGraphProps
) {
  const graphProps = useMemo(
    () => ({
      ...props,
      data: circles,
      init: (params: GraphParams) => {
        if (!elementRef.current) {
          throw new Error('Graph: Element ref is not set')
        }
        return getGraphInstance(view, elementRef.current, params)
      },
    }),
    [props, circles]
  )
  return useGraph<CircleFullFragment[], CirclesGraph>(graphProps)
}

export function getGraphInstance(
  view: CirclesGraphViews,
  element: RootElement,
  params: GraphParams
) {
  switch (view) {
    case CirclesGraphViews.AllCircles:
      return new AllCirclesGraph(element, params)
    case CirclesGraphViews.SimpleCircles:
      return new SimpleCirclesGraph(element, params)
    case CirclesGraphViews.FlatCircle:
      return new FlatCircleGraph(element, params)
    case CirclesGraphViews.Members:
      return new MembersGraph(element, params)
    default:
      throw new Error(`Unknown graph view type: ${view}`)
  }
}
