import * as d3 from 'd3'
import { NodeData, NodesSelection, NodeType } from '../../../types'
import { MoveTransition } from '../helpers/createTransition'
import { AbstractCircleElement } from './AbstractCircleElement'

export class TitleCircleElement extends AbstractCircleElement {
  enter(selection: NodesSelection, transition: MoveTransition) {
    // Add circle name at the top
    selection
      .filter((d) => d.data.type === NodeType.Circle)
      .append('text')
      .each(function (d) {
        const text = d3.select(this)
        // Split name into lines
        splitName(d.data.name).forEach((line, i, lines) => {
          text
            .append('tspan')
            .text(line)
            .attr('x', 0)
            .attr('dy', i == 0 ? 0 : 8)
            .attr(
              'alignment-baseline',
              lines.length === 1 ? 'hanging' : 'middle'
            )
        })
      })
      .attr('class', 'circle-title')
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
      .each(function (d) {
        const text = d3.select(this)
        const lines = splitName(d.data.name)
        let count = 0

        // Update existing lines
        text.selectAll('tspan').each(function (d, i) {
          const tspan = d3.select(this)
          if (i < lines.length) {
            tspan
              .text(lines[i])
              .attr(
                'alignment-baseline',
                lines.length === 1 ? 'hanging' : 'middle'
              )
            count++
          } else {
            tspan.remove()
          }
        })

        // Add new lines
        if (count < lines.length) {
          lines.slice(count).forEach((line, i) => {
            text
              .append('tspan')
              .text(line)
              .attr('x', 0)
              .attr('dy', 8)
              .attr(
                'alignment-baseline',
                lines.length === 1 ? 'hanging' : 'middle'
              )
          })
        }
      })
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

function splitName(name: string): string[] {
  if (name.length < 15) {
    return [name]
  }

  const halfLength = Math.ceil(name.length / 2)
  const i = name.indexOf(' ', halfLength)
  const j = name.lastIndexOf(' ', halfLength)

  if (i === -1 && j === -1) {
    return [name]
  } else if (i === -1) {
    return cutName(name, j)
  } else if (j === -1) {
    return cutName(name, i)
  }
  return cutName(name, i - halfLength < halfLength - j ? i : j)
}

function cutName(name: string, index: number): string[] {
  return [name.slice(0, index), name.slice(index + 1)]
}
