import * as d3 from 'd3'
import { MoveTransition } from '../helpers/createTransition'
import { getTargetNodeData } from '../helpers/getTargetNodeData'
import settings from '../settings'
import { NodeData, NodesSelection, NodeType } from '../types'
import { AbstractCircleElement } from './AbstractCircleElement'

const dragOrigin = { x: 0, y: 0 }

export class MouseCircleElement extends AbstractCircleElement {
  // Variables for dragging circles and members
  private dragNodes: NodesSelection | undefined
  private dragTarget: NodeData | null | undefined
  private dragTargets: NodesSelection | undefined

  enter(selection: NodesSelection, transition: MoveTransition) {
    const that = this
    const {
      zoom,
      params: { events },
    } = this.graph

    // Hover
    selection
      .on('mouseover.hover', function () {
        const g = d3.select<SVGGElement, NodeData>(this)

        // Add circle border
        if (!that.dragNodes && events.onCircleClick && events.onMemberClick) {
          g.attr('data-hover', '')
        }
      })
      .on('mouseout.hover', function () {
        const g = d3.select<SVGGElement, NodeData>(this)
        // Remove circle border
        if (!that.dragNodes) {
          g.attr('data-hover', null)
        }
      })

    // Add events
    selection
      .filter(
        (d) =>
          d.data.type === NodeType.Circle || d.data.type === NodeType.Member
      )

      // Click
      .on('click', (event, d: NodeData) => {
        if (d.data.type === NodeType.Circle) {
          // Click on circle
          events.onCircleClick?.(d.data.id)
        } else if (
          d.data.type === NodeType.Member &&
          d.data.parentId &&
          d.data.memberId
        ) {
          // Click on member
          events.onMemberClick?.(d.data.parentId, d.data.memberId)
        }
      })

      // Drag
      .call(
        d3
          .drag<SVGGElement, NodeData>()
          .filter(function (event) {
            return (
              // Disable when mousewheel is pressed
              event.button !== 1 &&
              // Control/Command key is pressed
              (event.ctrlKey || event.metaKey) &&
              // Disable when events are not provided
              events.onCircleMove &&
              events.onMemberMove
            )
          })
          .on('start', function (event, dragNode) {
            // Register mouse position
            dragOrigin.x = event.x
            dragOrigin.y = event.y

            // Register selection of circles and its descendants
            const descendants = dragNode.descendants()
            const circles = d3
              .select<SVGSVGElement, NodeData>(that.graph.svg)
              .selectAll<SVGGElement, NodeData>('.circle')
            that.dragNodes = circles
              .filter((node) => descendants.includes(node))
              .raise() // Put on top of everything
            that.dragTargets = circles.filter(
              (node) => !descendants.includes(node)
            )

            // Highlight dragged circle
            d3.select(this).attr('data-dragging', '')
          })
          .on('drag', function (event) {
            const dX = event.x - dragOrigin.x
            const dY = event.y - dragOrigin.y
            if (that.dragNodes && that.dragTargets) {
              // Move circle and its descendants
              that.dragNodes.attr(
                'transform',
                (d) => `translate(${d.x + dX},${d.y + dY})`
              )
              // Move circles names
              that.dragNodes.data().forEach((d) => {
                d3.select<SVGSVGElement, NodeData>(that.graph.svg)
                  .select(`#circle-name-${d.data.id}`)
                  .attr(
                    'transform',
                    (d) => `translate(${d.x + dX},${d.y + dY})`
                  )
              })

              const targetData = getTargetNodeData(
                that.dragTargets,
                event,
                zoom
              )

              if (targetData !== that.dragTarget) {
                // Unhighlight previously targeted circle
                that.dragTargets
                  .filter((node) => node === that.dragTarget)
                  .attr('data-drag-target', null)
                // Highlight newly targeted circle
                that.dragTargets
                  .filter((node) => node === targetData)
                  .attr('data-drag-target', '')

                that.dragTarget = targetData
              }
            }
          })
          .on('end', function (event, dragNode) {
            const shiftKey: boolean = event.sourceEvent.shiftKey

            // Drag end
            let actionMoved = false
            if (that.dragTargets && that.dragTarget) {
              const targetCircleId = that.dragTarget.data.id

              const differentParent = dragNode.data.parentId !== targetCircleId
              if (dragNode.data.type === NodeType.Circle) {
                if (shiftKey) {
                  // Copy circle to another circle
                  events
                    .onCircleCopy?.(dragNode.data.id, targetCircleId)
                    .then((newCircleId) => {
                      if (newCircleId) {
                        // Focus new circle
                        events.onCircleClick?.(newCircleId)
                      }
                    })
                } else if (differentParent) {
                  // Move circle to another circle
                  events.onCircleMove?.(dragNode.data.id, targetCircleId)
                  // (Re-)focus circle
                  zoom.focusCircleAfterDraw?.(dragNode.data.id)
                  actionMoved = true
                }
              } else if (
                dragNode.data.type === NodeType.Member &&
                dragNode.data.parentId &&
                dragNode.data.memberId &&
                differentParent &&
                targetCircleId
              ) {
                if (shiftKey) {
                  // Copy member to another circle
                  events.onMemberAdd?.(dragNode.data.memberId, targetCircleId)
                  // Focus new circle member
                  events.onMemberClick?.(targetCircleId, dragNode.data.memberId)
                } else {
                  // Move member to another circle
                  events.onMemberMove?.(
                    dragNode.data.memberId,
                    dragNode.data.parentId,
                    targetCircleId
                  )
                  // (Re-)focus member
                  zoom.focusCircleAfterDraw?.(dragNode.data.id)
                  actionMoved = true
                }
              }

              // Unhighlight target circle
              if (that.dragTarget) {
                that.dragTargets
                  .filter((node) => node === that.dragTarget)
                  .attr('data-drag-target', null)
              }
            }

            // Reset moved circle
            d3.select(this).attr('data-dragging', null)

            // Reset dragged circles
            if (that.dragNodes && !actionMoved) {
              const transition = d3
                .transition()
                .duration(settings.move.duration)
                .ease(settings.move.transition)

              that.dragNodes
                .transition(transition)
                .attr('transform', (d) => `translate(${d.x},${d.y})`)

              // Reset circles names
              that.dragNodes.data().forEach((d) => {
                d3.select<SVGSVGElement, NodeData>(that.graph.svg)
                  .select(`#circle-name-${d.data.id}`)
                  .transition(transition)
                  .attr('transform', (d) => `translate(${d.x},${d.y})`)
              })
            }

            that.dragNodes = undefined
            that.dragTargets = undefined
            that.dragTarget = undefined
          })
      )
  }

  update(selection: NodesSelection, transition: MoveTransition) {}

  exit(selection: NodesSelection, transition: MoveTransition) {}
}
