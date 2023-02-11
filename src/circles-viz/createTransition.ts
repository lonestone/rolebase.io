import * as d3 from 'd3'
import settings from './settings'
import { Data } from './types'

export function createMoveTransition() {
  return d3
    .transition<Data>()
    .duration(settings.move.duration)
    .ease(settings.move.transition)
}
