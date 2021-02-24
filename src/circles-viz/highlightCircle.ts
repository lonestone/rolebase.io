import settings from './settings'
import { NodesSelection } from './types'

export function highlightCircle(
  selection: NodesSelection,
  fade = false,
  stroke = false
) {
  const circle = selection
    .select('circle')
    .transition()
    .duration(settings.highlight.duration)
    .attr('r', (d) => d.r + settings.highlight.increaseRadius)
  if (fade) {
    circle.attr('opacity', 0.7)
  }
  if (stroke) {
    circle.attr('stroke', 'rgba(1,1,1,0.5)')
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
      .attr('r', (d) => d.r)
      .attr('opacity', 1)
      .attr('stroke', 'none')
  }
}
