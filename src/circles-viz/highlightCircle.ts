import * as d3 from 'd3'
import settings from './settings'
import { NodesSelection } from './types'

export function highlightCircle(
  selection: NodesSelection,
  fade = false,
  stroke = false
) {
  const transition = selection
    .select('circle')
    .transition()
    .duration(settings.highlight.duration)
    .ease(d3.easeCircleOut)
    .attr('r', (d) => d.r + settings.highlight.increaseRadius)
  if (fade) {
    transition.attr('opacity', 0.7)
  }
  if (stroke) {
    transition.attr('stroke', 'rgba(1,1,1,0.5)')
  }
}
export function unhighlightCircle(
  selection: NodesSelection,
  instant?: boolean
) {
  const circle = selection.select('circle')
  if (instant) {
    circle
      .attr('r', (d) => d.r)
      .attr('opacity', 1)
      .attr('stroke', 'none')
  } else {
    circle
      .transition()
      .duration(instant ? 0 : settings.highlight.duration)
      .ease(d3.easeCircleOut)
      .attr('r', (d) => d.r)
      .attr('opacity', 1)
      .attr('stroke', 'none')
  }
}
