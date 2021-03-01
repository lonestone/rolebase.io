import * as d3 from 'd3'
import { Transition } from 'd3'
import { MemberEntry } from '../data/members'
import { GraphEvents } from './createGraph'
import { getFirstname } from './getFirstname'
import { getNodeColor } from './getNodeColor'
import { getTargetNodeData } from './getTargetNodeData'
import {
  getHighlightTransition,
  highlightCircle,
  unhighlightCircle,
} from './highlightCircle'
import selectAppend from './selectAppend'
import settings from './settings'
import { NodeData, NodesSelection, NodeType, Zoom } from './types'

const newCircleId = 'new-circle'

interface AddMenuParams {
  members: MemberEntry[]
  width: number
  height: number
  events: GraphEvents
  zoom: Zoom
}

function getNodeType(data: MemberEntry) {
  return data.id === newCircleId ? NodeType.Circle : NodeType.Member
}

function getTotalHeight(membersNumber: number) {
  return (
    settings.addMenu.padding * 2 +
    membersNumber *
      (settings.addMenu.placeholderRadius * 2 + settings.addMenu.spacing)
  )
}

export default function updateAddMenu(
  svgElement: SVGSVGElement,
  { members, width, height, events, zoom }: AddMenuParams
) {
  const svg = d3.select(svgElement)
  const svgId = svg.attr('id')

  // Variables for dragging members
  const dragOrigin = { x: 0, y: 0 }
  let dragTarget: NodeData | null | undefined
  let dragTargets: NodesSelection | undefined

  function getNodeTransform(data: MemberEntry) {
    const index = members.indexOf(data) + 1
    return `translate(${
      settings.addMenu.padding + settings.addMenu.placeholderRadius
    },${
      settings.addMenu.marginTop +
      settings.addMenu.padding +
      settings.addMenu.placeholderRadius +
      index *
        (settings.addMenu.placeholderRadius * 2 + settings.addMenu.spacing)
    })`
  }

  // Menu to add circles and members
  const addMenuData = [{ id: newCircleId, name: 'Cercle' }, ...members]

  const addMenu = selectAppend(svg, 'g', 'add-menu').raise()

  // Scroll
  const scrollHeight =
    getTotalHeight(addMenuData.length) - height + settings.addMenu.marginTop
  let scrollY = 0
  let scrollTransition:
    | Transition<SVGGElement, unknown, null, undefined>
    | undefined
  addMenu.on('mousewheel', function (event) {
    event.stopPropagation()
    scrollY -= event.deltaY
    if (scrollY > 0) scrollY = 0
    if (scrollY < -scrollHeight) scrollY = -scrollHeight
    if (!scrollTransition) {
      scrollTransition = addMenuScroll
        .transition()
        .duration(150)
        .ease(d3.easeLinear)
    }
    scrollTransition
      .attr('transform', `translate(0,${scrollY})`)
      .call(() => (scrollTransition = undefined))
  })

  // Rect shape behind
  selectAppend(addMenu, 'rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr(
      'width',
      settings.addMenu.padding * 2 + settings.addMenu.placeholderRadius * 2
    )
    .attr('height', height - settings.addMenu.marginTop)
    .attr('fill', 'rgba(255,255,255,0.4)')

  const addMenuScroll = selectAppend(addMenu, 'g', 'add-menu-scroll')

  addMenuScroll
    .selectAll('.add-placeholder')
    .data(addMenuData, (d: any) => d.id)
    .join(
      // Create placeholder
      (nodeEnter) => {
        const nodeGroup = nodeEnter
          .append('g')
          .attr('class', 'add-placeholder')
          .attr('transform', getNodeTransform)

        // Add circle shape
        nodeGroup
          .append('circle')
          .attr('id', (d) => `addmenu-circle-${d.id}`)
          .attr('r', settings.addMenu.placeholderRadius)
          .attr('opacity', 1)
          .attr('fill', (d) => getNodeColor(getNodeType(d)))
          .attr('cursor', 'pointer')

        // Add clip-path with circle
        nodeGroup
          .append('clipPath')
          .attr('id', (d) => `addmenu-clip-${d.id}`)
          .append('use')
          .attr('xlink:href', (d) => `#addmenu-circle-${d.id}`)

        // Add picture
        nodeGroup
          .append('image')
          .attr('pointer-events', 'none')
          .attr('xlink:href', (d) => d.picture || '')
          .attr('clip-path', (d) => `url(#addmenu-clip-${d.id})`)
          .attr('x', -settings.addMenu.placeholderRadius)
          .attr('y', -settings.addMenu.placeholderRadius)
          .attr('height', settings.addMenu.placeholderRadius * 2)
          .attr('width', settings.addMenu.placeholderRadius * 2)

        // Add name
        nodeGroup
          .append('text')
          .attr('pointer-events', 'none')
          .text((d) => getFirstname(d.name))
          .attr('x', 0)
          .attr('y', '0.5em')
          .attr('font-weight', (d) => (d.picture ? 'bold' : 'normal'))
          .attr('opacity', (d) => (d.picture ? 0 : 1))
          // Stroke on member name
          .filter((d) => d.id !== newCircleId)
          .attr('paint-order', 'stroke')
          .attr('stroke', 'white')
          .attr('stroke-width', '2px')
          .attr('stroke-linecap', 'butt')
          .attr('stroke-linejoin', 'miter')

        // Add events
        nodeGroup
          // Hover
          .on('mouseover', function () {
            d3.select(this)
              .attr('filter', `url(#${svgId}-shadow)`)
              .select('text')
              .attr('font-weight', 'bold')
              .attr('opacity', 1)
          })
          .on('mouseout', function () {
            d3.select<SVGGElement, MemberEntry>(this)
              .attr('filter', `none`)
              .select('text')
              .attr('font-weight', (d) => (d.picture ? 'bold' : 'normal'))
              .attr('opacity', (d) => (d.picture ? 0 : 1))
          })

          // Drag
          .call(
            d3
              .drag<SVGGElement, MemberEntry>()
              .on('start', function (event, dragNode) {
                // Register mouse position
                dragOrigin.x = event.x
                dragOrigin.y = event.y

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

                  const targetData = getTargetNodeData(dragTargets, event, zoom)

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
                const clicked =
                  dragOrigin.x === event.x && dragOrigin.y === event.y

                // Click
                if (clicked && dragNode.id !== newCircleId) {
                  events.onMemberClick?.(dragNode.id)
                }

                // Drag end
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
                d3.select<SVGGElement, MemberEntry>(this).attr(
                  'transform',
                  getNodeTransform
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
        nodeUpdate.attr('transform', getNodeTransform)

        // Update style
        nodeUpdate
          .select('circle')
          .attr('r', settings.addMenu.placeholderRadius)
          .attr('opacity', 1)

        // Update name
        nodeUpdate.select('text').text((d) => getFirstname(d.name))

        // Update picture
        nodeUpdate.select('image').attr('xlink:href', (d) => d.picture || '')

        // Update position
        return nodeUpdate
      },

      // Remove placeholder
      (nodeExit) => nodeExit.remove()
    )
}
