import * as d3 from 'd3'
import { BaseType, Transition } from 'd3'
import settings from './settings'
import { NodeData, NodesSelection } from './types'

type HighlightTransition = Transition<SVGGElement, NodeData, BaseType, unknown>

interface HighlightOptions {
  fade?: boolean
  stroke?: boolean
  instant?: boolean
  transition?: HighlightTransition
}

export function getHighlightTransition(): HighlightTransition {
  return d3
    .transition()
    .duration(settings.highlight.duration)
    .ease(settings.highlight.transition) as any
}

export function highlightCircle(
  selection: NodesSelection,
  options?: HighlightOptions
) {
  if (!options) options = {}
  const transition: HighlightTransition | NodesSelection = options.instant
    ? selection
    : selection.transition(
        (options.transition || getHighlightTransition()) as any
      )

  const circle = (transition as HighlightTransition).select('circle')

  if (options.fade) {
    circle.attr('opacity', 0.5)
  }
  if (options.stroke) {
    circle.attr('stroke-width', '2px').attr('stroke', 'rgba(1,1,1,0.5)')
  }
}

export function unhighlightCircle(
  selection: NodesSelection,
  options?: HighlightOptions
) {
  if (!options) options = {}
  const transition: HighlightTransition | NodesSelection = options.instant
    ? selection
    : selection.transition(
        (options.transition || getHighlightTransition()) as any
      )

  const circle = (transition as HighlightTransition).select('circle')

  circle.attr('opacity', 1).attr('stroke', 'none')
}
