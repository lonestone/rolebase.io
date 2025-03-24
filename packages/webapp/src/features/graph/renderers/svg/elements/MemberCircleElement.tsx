import { NodesSelection, NodeType } from '../../../types'
import { MoveTransition } from '../helpers/createTransition'
import { AbstractCircleElement } from './AbstractCircleElement'

export class MemberCircleElement extends AbstractCircleElement {
  enter(selection: NodesSelection, transition: MoveTransition) {
    // Add member picture
    const nodeMembers = selection.filter((d) => d.data.type === NodeType.Member)

    nodeMembers
      .attr('opacity', 'clamp(0, (var(--zoom-scale) - 1) * 20 + 1, 1)')
      .attr('pointer-events', 'var(--member-pointer-events)')

    nodeMembers
      .append('image')
      .attr('class', 'member-picture')
      .attr('pointer-events', 'none')
      .attr('preserveAspectRatio', 'xMidYMid slice')
      .attr('href', (d) => d.data.picture || '')
      .attr('clip-path', (d) => `url(#clip-${d.data.id})`)
      .attr('x', (d) => -d.r)
      .attr('y', (d) => -d.r)
      .attr('height', (d) => d.r * 2)
      .attr('width', (d) => d.r * 2)

    // Add clip-path with circle
    nodeMembers
      .append('clipPath')
      .attr('id', (d) => `clip-${d.data.id}`)
      .append('use')
      .attr('href', (d) => `#circle-${d.data.id}`)

    // Add member name
    nodeMembers
      .append('text')
      .attr('class', 'member-name')
      .attr('font-size', '10px')
      .attr('font-weight', 'normal')
      .attr('fill', '#fff')
      .attr('paint-order', 'stroke')
      .attr('stroke', 'rgba(0, 0, 0, 0.3)')
      .attr('stroke-width', 1)
      .attr('stroke-linecap', 'butt')
      .attr('stroke-linejoin', 'miter')
      .attr('dominant-baseline', 'central')
      .attr('y', (d) => d.r - 10)
      .text((d) => this.getFirstname(d.data.name))
      .attr('pointer-events', 'none')
      .attr('paint-order', 'stroke')
      .attr('transform', 'scale(0.1)')
      .attr('opacity', 0)
      .transition(transition)
      .attr('transform', 'scale(1)')
      .attr('opacity', 1)
  }

  update(selection: NodesSelection, transition: MoveTransition) {
    // Update member name
    selection
      .select<SVGTextElement>('.member-name')
      .text((d) => this.getFirstname(d.data.name))
      .attr('opacity', (d) => (d.data.picture ? 0 : 1))

    // Update member picture
    selection
      .select<SVGImageElement>('.member-picture')
      .filter(
        (d, i, elements) =>
          elements[i].getAttribute('href') !== (d.data.picture || '')
      )
      .attr('href', (d) => d.data.picture || '')
  }

  exit(selection: NodesSelection, transition: MoveTransition) {
    selection
      .select<SVGTextElement>('.member-name')
      .text((d) => this.getFirstname(d.data.name))
      .transition(transition)
      .attr('transform', 'scale(0.1)')
      .attr('opacity', 0)
      .remove()
  }

  private getFirstname(name: string) {
    return name.replace(/ .*$/, '')
  }
}
