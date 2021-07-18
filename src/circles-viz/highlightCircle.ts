import * as d3 from 'd3'
import { BaseType, Transition } from 'd3'
import settings from './settings'
import { NodeData, NodesSelection } from './types'

type HighlightTransition = Transition<SVGGElement, NodeData, BaseType, unknown>

interface HighlightOptions {
  opacity?: number
  strokeWidth?: number
  strokeColor?: string
  filter?: string
  instant?: boolean
  transition?: HighlightTransition | null
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

  if (options.opacity !== undefined) {
    circle.attr('opacity', options.opacity)
  }
  if (options.filter !== undefined) {
    circle.attr('filter', options.filter)
  }
  if (options.strokeWidth !== undefined) {
    circle
      .attr('stroke-width', `${options.strokeWidth}px`)
      .attr('stroke', options.strokeColor || '#333')
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

  circle.attr('opacity', 1).attr('stroke-width', '0').attr('filter', 'none')
}
