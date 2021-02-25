import * as d3 from 'd3'
import { MemberEntry } from '../data/members'
import { getNodeColor } from './getNodeColor'
import { getTargetNodeData } from './getTargetNodeData'
import {
  getHighlightTransition,
  highlightCircle,
  unhighlightCircle,
} from './highlightCircle'
import { NodeData, NodesSelection, NodeType } from './types'
import { GraphEvents } from './updateGraph'

const newCircleId = 'new-circle'

interface AddMenuParams {
  members: MemberEntry[]
  events: GraphEvents
}

function getNodeType(data: MemberEntry) {
  return data.id === newCircleId ? NodeType.Circle : NodeType.Member
}

export default function updateAddMenu(
  svgElement: SVGSVGElement,
  { members, events }: AddMenuParams
) {
  const svg = d3.select(svgElement)
  const svgId = svg.attr('id')

  // Variables for dragging members
  let dragTarget: NodeData | null | undefined
  let dragTargets: NodesSelection | undefined

  // Menu to add circles and members
  const addMenuData = [{ id: newCircleId, name: 'Cercle' }, ...members]
  svg
    .selectAll('.add-placeholder')
    .data(addMenuData, (d: any) => d.id)
    .join(
      // Create placeholder
      (nodeEnter) => {
        const nodeGroup = nodeEnter
          .append('g')
          .attr('class', 'add-placeholder')
          .attr('transform', (d, i) => `translate(40,${40 + i * 55})`)

        // Add circle shape
        nodeGroup
          .append('circle')
          .attr('r', 25)
          .attr('opacity', 1)
          .attr('fill', 'yellow')
          .attr('fill', (d) => getNodeColor(getNodeType(d)))
          .attr('cursor', 'pointer')

        // Add member name
        nodeGroup
          .append('text')
          .attr('y', '0.5em')
          .text((d) => d.name)
          .attr('pointer-events', 'none')

        // Add events
        nodeGroup
          // Hover
          .on('mouseover', function () {
            d3.select(this).attr('filter', `url(#${svgId}-shadow)`)
          })
          .on('mouseout', function () {
            d3.select(this).attr('filter', `none`)
          })

          // Drag
          .call(
            d3
              .drag<SVGGElement, MemberEntry>()
              .on('start', function (event, dragNode) {
                d3.select(this).raise()
                // Register selection of all circles
                dragTargets = svg.selectAll<SVGGElement, NodeData>('.circle')
              })
              .on('drag', function (event, dragNode) {
                if (dragTargets) {
                  // Move circle and its descendants
                  const selection = d3
                    .select<SVGGElement, MemberEntry>(this)
                    .attr('transform', `translate(${event.x},${event.y})`)

                  const targetData = getTargetNodeData(dragTargets, event)

                  if (targetData !== dragTarget) {
                    const transition = getHighlightTransition()

                    // Unhighlight previously targeted circle
                    unhighlightCircle(
                      dragTargets.filter((node) => node === dragTarget),
                      { transition }
                    )
                    // Highlight newly targeted circle
                    highlightCircle(
                      dragTargets.filter((node) => node === targetData),
                      {
                        fade: false,
                        stroke: true,
                        transition,
                      }
                    )
                    // Change color of dragged circle
                    selection
                      .select('circle')
                      .transition(transition as any)
                      .attr('fill', (d) =>
                        getNodeColor(
                          getNodeType(d),
                          (targetData?.depth || 0) + 1
                        )
                      )
                    dragTarget = targetData
                  }
                }
              })
              .on('end', function (event, dragNode) {
                if (dragTargets && dragTarget !== undefined) {
                  const targetCircleId = dragTarget?.data.id || null

                  // Add to a circle
                  if (dragNode.id === newCircleId) {
                    events.onCircleAdd?.(targetCircleId) || false
                  } else if (targetCircleId) {
                    events.onMemberAdd?.(dragNode.id, targetCircleId)
                  }

                  // Unhighlight target circle
                  if (dragTarget) {
                    unhighlightCircle(
                      dragTargets.filter((node) => node === dragTarget),
                      { instant: true }
                    )
                  }
                }

                // Reset moved circle
                d3.select(this).attr(
                  'transform',
                  (d, i) => `translate(40,${40 + i * 55})`
                )

                dragTargets = undefined
                dragTarget = undefined
              })
          )

        return nodeGroup
      },

      // Update placeholder
      (nodeUpdate) => {
        // Update position
        nodeUpdate.attr('transform', (d, i) => `translate(40,${40 + i * 55})`)

        // Update style
        nodeUpdate.select('circle').attr('r', 25).attr('opacity', 1)

        // Update  name
        nodeUpdate.select('text').text((d) => d.name)

        // Update position
        return nodeUpdate
      },

      // Remove placeholder
      (nodeExit) => nodeExit.remove()
    )
}
