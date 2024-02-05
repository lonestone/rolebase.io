import { defaultCircleColorHue } from '@shared/helpers/circleColor'
import { MoveTransition } from '../../../helpers/createTransition'
import { NodeData, NodesSelection, NodeType } from '../../../types'
import { AbstractCircleElement } from './AbstractCircleElement'

export class ContainerCircleElement extends AbstractCircleElement {
  enter(selection: NodesSelection, transition: MoveTransition) {
    // Position circle with transition
    selection
      .attr('transform', (d) =>
        d.data.type === NodeType.Member
          ? `translate(${d.parent?.parent?.x},${d.parent?.parent?.y})`
          : `translate(${d.parent?.x},${d.parent?.y})`
      )
      .transition(transition)
      .attr('transform', (d) => `translate(${d.x},${d.y})`)

    // Set CSS variables
    this.setCSSVariables(selection)

    // No events on members group
    selection
      .filter((d) => d.data.type === NodeType.MembersCircle)
      .attr('pointer-events', 'none')

    // Add circle shape
    selection
      .append('circle')
      .attr('class', 'circle-container')
      .attr('id', (d) => `circle-${d.data.id}`)
      .attr('stroke-width', '0') // Init stroke-width for transitions
      .attr('r', 0)
      .attr('opacity', 0)
      .transition(transition)
      .attr('r', (d) => d.r)
      .attr('opacity', 1)
  }

  update(selection: NodesSelection, transition: MoveTransition) {
    // Set CSS variables
    this.setCSSVariables(selection as any)

    // Update position
    selection
      .transition(transition)
      .attr('transform', (d) => `translate(${d.x},${d.y})`)

    // Update circle style
    selection
      .select('.circle-container')
      .transition(transition)
      .attr('r', (d) => d.r)
      .attr('opacity', 1)
      .attr('stroke', 'none')
  }

  exit(selection: NodesSelection, transition: MoveTransition) {
    selection
      .transition(transition)
      // Go to parent position
      .attr('transform', (d) =>
        d.data.type === NodeType.Member
          ? `translate(${d.parent?.parent?.x},${d.parent?.parent?.y})`
          : `translate(${d.parent?.x},${d.parent?.y})`
      )
      //.attr('transform', (d) => `translate(0,0)`)
      // Remove at the end
      .remove()

    // Fade out circle
    selection.select('.circle-container').transition(transition).attr('r', 0)
  }

  private setCSSVariables(nodes: NodesSelection) {
    nodes.each((d: NodeData, i, nodes) => {
      const node = nodes[i]
      node.style.setProperty('--depth', d.depth.toString())
      node.style.setProperty(
        '--hue',
        (d.data.colorHue ?? defaultCircleColorHue).toString()
      )
    })
  }
}
