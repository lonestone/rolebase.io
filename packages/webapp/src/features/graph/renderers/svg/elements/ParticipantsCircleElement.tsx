import { Participant } from '@shared/model/member'
import * as d3 from 'd3'
import { NodeData, NodesSelection, NodeType } from '../../../types'
import { MoveTransition } from '../helpers/createTransition'
import { AbstractCircleElement } from './AbstractCircleElement'

const radiusRatio = 0.3
const paddingRatio = 0.05

export class ParticipantsCircleElement extends AbstractCircleElement {
  prevParticipants = d3.local<number>()

  enter(selection: NodesSelection, transition: MoveTransition) {
    const that = this

    // Add circle content component
    selection
      .filter((d) => d.data.type === NodeType.Circle && !!d.data.participants)
      .each(function (d) {
        const circleNode = d3.select<SVGGElement, NodeData>(this)
        const radius = d.r * radiusRatio
        const padding = d.r * paddingRatio
        that.prevParticipants.set(this, d.data.participants?.length || 0)

        // Get participants leaders
        const leaders = d.data.participants?.reduce((acc, p) => {
          if (p.leader && !acc.find((p2) => p2.member.id === p.member.id)) {
            acc.push(p)
          }
          return acc
        }, [] as Participant[])

        leaders?.reverse().forEach((participant, i) => {
          const xRange = Math.min(
            2 * (d.r - padding - radius),
            (leaders.length - 1) * (2 * radius + padding)
          )
          const reverseI = leaders.length - 1 - i
          const x =
            !leaders || leaders.length === 1
              ? 0
              : (reverseI / (leaders.length - 1)) * xRange - xRange / 2

          const group = circleNode
            .append('g')
            .attr('class', 'circle-participant')
            .attr('transform', `translate(0, 0), scale(0.1)`)
            .attr('opacity', 0)
          group
            .transition(transition)
            .attr('transform', `translate(${x}, 0), scale(1)`)
            .attr('opacity', 1)

          // Add circle shape
          const circle = group
            .append('circle')
            .attr('id', `circle-${d.data.id}-${participant.member.id}`)
            .attr('stroke-width', '0') // Init stroke-width for transitions
            .attr('r', radius)

          circle.each((d: NodeData, i, nodes) => {
            nodes[i].style.setProperty('--depth', (d.depth + 2).toString())
          })

          // Add clip-path with circle
          group
            .append('clipPath')
            .attr('id', `clip-${d.data.id}-${participant.member.id}`)
            .append('use')
            .attr('href', `#circle-${d.data.id}-${participant.member.id}`)

          // Add picture
          group
            .append('image')
            .attr('id', participant.member.id)
            .attr('pointer-events', 'none')
            .attr('preserveAspectRatio', 'xMidYMid slice')
            .attr('href', participant.member.picture || '')
            .attr(
              'clip-path',
              `url(#clip-${d.data.id}-${participant.member.id})`
            )
            .attr('x', -radius)
            .attr('y', -radius)
            .attr('height', 2 * radius)
            .attr('width', 2 * radius)

          // Add member name
          group
            .append('text')
            .attr('font-size', '6px')
            .attr('font-weight', 'bold')
            .attr('fill', '#fff')
            .attr('dominant-baseline', 'central')
            .text(participant.member.name[0].toUpperCase())
            .attr('opacity', participant.member.picture ? 0 : 1)
            .attr('pointer-events', 'none')
            .attr('paint-order', 'stroke')
        })
      })
  }

  update(selection: NodesSelection, transition: MoveTransition) {
    const that = this
    // Update circle participants
    selection
      .filter((d) => d.data.type === NodeType.Circle)
      .each(function (d) {
        const nParticipants = d.data.participants?.length || 0
        const prevParticipants = that.prevParticipants.get(this) || 0
        // Redraw because number of participants has changed
        if (prevParticipants !== nParticipants) {
          that.prevParticipants.set(this, nParticipants)
          const circleNode = d3.select<SVGGElement, NodeData>(this)
          that.exit(circleNode, transition)
          if (nParticipants) {
            that.enter(circleNode, transition)
          }
        }
      })
  }

  exit(selection: NodesSelection, transition: MoveTransition) {
    // Fade out participants
    selection
      .selectAll('.circle-participant')
      .transition(transition)
      .attr('opacity', 0)
      .attr('transform', `translate(0, 0), scale(0.1)`)
      .remove()
  }
}
