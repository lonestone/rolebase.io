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
  const transition = options.transition || getHighlightTransition()

  const selectionTransition = selection
    .transition(transition as any)
    .select('circle')
    .attr('r', (d) => d.r + settings.highlight.increaseRadius)

  if (options.fade) {
    selectionTransition.attr('opacity', 0.7)
  }
  if (options.stroke) {
    selectionTransition.attr('stroke', 'rgba(1,1,1,0.5)')
  }
}

export function unhighlightCircle(
  selection: NodesSelection,
  options?: HighlightOptions
) {
  if (!options) options = {}
  let circle: HighlightTransition | NodesSelection = selection.select('circle')

  if (!options.instant) {
    const transition = options.transition || getHighlightTransition()
    circle
      .transition(transition as any)
      .attr('r', (d) => d.r)
      .attr('opacity', 1)
      .attr('stroke', 'none')
  } else {
    circle
      .attr('r', (d) => d.r)
      .attr('opacity', 1)
      .attr('stroke', 'none')
  }
}
