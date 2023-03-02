import { getTopFontSize, getTopNameOpacity } from '../helpers/circleName'
import { MoveTransition } from '../helpers/createTransition'
import { NodesSelection, NodeType } from '../types'
import { AbstractCircleElement } from './AbstractCircleElement'

export class TitleCircleElement extends AbstractCircleElement {
  enter(selection: NodesSelection, transition: MoveTransition) {
    // Add circle name at the top
    selection
      .filter((d) => d.data.type === NodeType.Circle)
      .append('text')
      .attr('class', 'circle-title')
      .text((d) => d.data.name)
      .attr('cursor', 'var(--circle-cursor)')
      .attr('alignment-baseline', 'hanging')
      .attr('pointer-events', 'none')
      .attr('font-size', getTopFontSize)
      .attr('opacity', getTopNameOpacity)
      .attr('y', 0)
      .attr('transform', 'scale(0.1)')
      .transition(transition)
      .attr('y', (d) => -d.r + 2)
      .attr('transform', 'scale(1)')
  }

  update(selection: NodesSelection, transition: MoveTransition) {
    // Update circle name
    selection
      .select<SVGTextElement>('.circle-title')
      .text((d) => d.data.name)
      .transition(transition)
      .attr('y', (d) => -d.r + 2)
      .attr('font-size', getTopFontSize)
      .attr('opacity', getTopNameOpacity)
      .attr('transform', 'scale(1)')
  }

  exit(selection: NodesSelection, transition: MoveTransition) {
    // Fade out title
    selection
      .select('.circle-title')
      .transition(transition)
      .attr('transform', 'scale(0)')
      .attr('y', 0)
  }
}
