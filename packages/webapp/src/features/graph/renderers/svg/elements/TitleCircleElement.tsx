import { NodeData, NodesSelection, NodeType } from '../../../types'
import { MoveTransition } from '../helpers/createTransition'
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
      .attr('font-size', this.getTopFontSize)
      .attr('opacity', this.getTopNameOpacity)
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
      .attr('font-size', this.getTopFontSize)
      .attr('opacity', this.getTopNameOpacity)
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

  // Opacity depends on zoom scale and node depth
  // Visible when:
  // - zoom more than 1
  // - circle is bigger than 2/3 of graph size
  private getTopNameOpacity(data: NodeData) {
    const threshold = 2 / 3
    const rate = 20
    return `clamp(0, max(
      (var(--zoom-scale) - 1) * ${rate} + 1,
      (var(--zoom-scale) * ${
        data.r * 2
      } / var(--graph-min-size) - ${threshold}) * ${rate}
    ), 1)`
  }

  private getTopFontSize() {
    return `calc(12px / var(--zoom-scale) + var(--zoom-scale) * 1px)`
  }
}
