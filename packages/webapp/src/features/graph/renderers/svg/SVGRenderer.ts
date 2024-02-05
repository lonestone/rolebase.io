import { isSafari } from '@utils/env'
import { Selection, ZoomTransform } from 'd3'
import debounce from 'lodash.debounce'
import { CirclesGraph } from '../../graphs/CirclesGraph'
import { createMoveTransition } from '../../helpers/createTransition'
import selectAppend from '../../helpers/selectAppend'
import { NodeData, NodeType } from '../../types'
import Renderer from '../Renderer'
import { AbstractCircleElement } from './elements/AbstractCircleElement'
import { ContainerCircleElement } from './elements/ContainerCircleElement'
import { MemberCircleElement } from './elements/MemberCircleElement'
import { MouseCircleElement } from './elements/MouseCircleElement'
import { ParticipantsCircleElement } from './elements/ParticipantsCircleElement'
import { TitleCircleElement } from './elements/TitleCircleElement'

export class SVGRenderer extends Renderer {
  private cursor = 'pointer'
  private zoomG: Selection<SVGGElement, NodeData, null, undefined>

  private circleElements: AbstractCircleElement[]

  constructor(public graph: CirclesGraph) {
    super()
    this.updateCSSVariables()

    const { element, d3Root } = graph
    const svgId = d3Root.attr('id')

    // Handle outside click
    element.addEventListener('click', (event) => {
      if (event.target === element) {
        graph.params.events.onClickOutside?.()
      }
    })

    // Shadow filter
    d3Root
      .append('filter')
      .attr('id', `${svgId}-shadow`)
      .append('feDropShadow')
      .attr('flood-opacity', 0.3)
      .attr('dx', 0)
      .attr('dy', 3)

    // Zoom
    this.zoomG = d3Root.append('g').attr('class', 'panzoom')
    graph.on('zoom', this.onZoom)
    graph.on('zoomScale', this.onZoomScale)

    // Keyboard events
    document.body.addEventListener('keydown', this.onKeyDown)
    document.body.addEventListener('keyup', this.onKeyUp)

    // Circle elements
    this.circleElements = [
      new ContainerCircleElement(this.graph),
      new TitleCircleElement(this.graph),
      new ParticipantsCircleElement(this.graph),
      new MemberCircleElement(this.graph),
      new MouseCircleElement(this.graph),
    ]

    // Listen to data updates
    this.graph.on('nodesData', this.onNodesData)
  }

  destroy() {
    // Remove listeners
    this.graph.off('nodesData', this.onNodesData)
    this.graph.off('zoom', this.onZoom)
    this.graph.off('zoomScale', this.onZoomScale)
    document.body.removeEventListener('keydown', this.onKeyDown)
    document.body.removeEventListener('keyup', this.onKeyUp)
  }

  private onZoom = (transform: ZoomTransform) => {
    this.zoomG.attr('transform', transform.toString())
  }

  private onZoomScale = () => {
    this.updateCSSVariablesDebounced()
  }

  private onKeyDown = (event: KeyboardEvent) => {
    this.updateCursor(event)
  }

  private onKeyUp = (event: KeyboardEvent) => {
    this.updateCursor(event)
  }

  private onNodesData = (nodesData: NodeData[]) => {
    this.drawCircles(nodesData)
    this.drawCircleNames(nodesData)
  }

  protected drawCircles(nodesData: NodeData[]) {
    // Add circle groups
    selectAppend(this.zoomG, 'g', 'circles')
      .selectAll('.circle')
      .data(nodesData, (d: any) => d.data.id)
      .join(
        // Create Circle
        (nodeEnter) => {
          const transition = createMoveTransition()

          const nodeGroup = nodeEnter
            .append('g')
            .attr(
              'class',
              (d) => `circle circle-${d.data.id} type-${d.data.type}`
            )

          // Add circle elements
          for (const circleElement of this.circleElements) {
            circleElement.enter(nodeGroup, transition)
          }

          return nodeGroup
        },

        // Update Circle
        (nodeUpdate) => {
          const transition = createMoveTransition()

          // Update circle elements
          for (const circleElement of this.circleElements) {
            circleElement.update(nodeUpdate as any, transition)
          }

          return nodeUpdate
        },

        // Remove Circle
        (nodeExit) => {
          const transition = createMoveTransition()

          // Exit circle elements
          for (const circleElement of this.circleElements) {
            circleElement.exit(nodeExit as any, transition)
          }

          setTimeout(() => nodeExit.raise(), 0)

          return nodeExit
        }
      )

      // Sort by depth and Y, then raise
      .sort((a, b) =>
        a.depth === b.depth ? a.y - b.y : a.depth < b.depth ? -1 : 1
      )
      .raise()
  }

  private drawCircleNames(nodesData: NodeData[]) {
    // Circles Names
    selectAppend(this.zoomG, 'g', 'circles-names')
      .selectAll('.circle-name')
      .data(nodesData, (d: any) => d.data.id)
      .join(
        (nodeEnter) => {
          const transition = createMoveTransition()

          const nodeGroup = nodeEnter
            .filter((d) => d.data.type === NodeType.Circle)
            .append('g')
            .attr('id', (d) => `circle-name-${d.data.id}`)
            .attr('class', 'circle-name')

          // Position name with transition
          nodeGroup
            // Start scale above 0 to enable getCenterFontSize to function properly
            .attr(
              'transform',
              (d) => `scale(0.1), translate(${d.parent?.x},${d.parent?.y})`
            )
            .transition(transition)
            .attr('transform', (d) => `scale(1), translate(${d.x},${d.y})`)

          // Add circle name centered
          nodeGroup
            .append('text')
            .text((d) => d.data.name)
            .attr('pointer-events', 'none')
            .attr('dominant-baseline', 'central')
            .attr('y', 0)
            .attr('font-size', this.getFontSize)
            .attr('font-size', this.getFontSize) // Repeated to fix bug on Safari
            .attr('opacity', this.getNameOpacity)

          return nodeGroup
        },
        (nodeUpdate) => {
          const transition = createMoveTransition()

          // Update position
          nodeUpdate
            .transition(transition)
            .attr('transform', (d) => `translate(${d.x},${d.y})`)

          // Update circle name
          nodeUpdate
            .select<SVGTextElement>('text')
            .text((d) => d.data.name)
            .attr('font-size', this.getFontSize)
            .attr('opacity', this.getNameOpacity)
          return nodeUpdate
        },
        (nodeExit) => nodeExit.remove()
      )
  }

  // Opacity depends on zoom scale, circle size and graph size
  // Visible when:
  // - zoom less than 1
  // - circle is smaller than 2/3 of graph size
  // - parent is not visible
  private getNameOpacity(data: NodeData) {
    const gap = 0.01
    const rate = 20
    const threshold = 2 / 3
    return `clamp(0, min(
      (1 - var(--zoom-scale) - ${gap}) * ${rate},
      1 - (var(--zoom-scale) * ${
        data.r * 2
      } / var(--graph-min-size) - ${threshold} + ${gap}) * ${rate},
      ${
        data.parent && data.parent.data.id !== 'root'
          ? `(var(--zoom-scale) * ${
              data.parent.r * 2
            } / var(--graph-min-size) - ${threshold}) * ${rate}`
          : '1'
      }
    ), 1)`
  }

  private getFontSize(
    data: NodeData,
    index: number,
    nodes: SVGTextElement[] | ArrayLike<SVGTextElement>
  ) {
    const node = nodes[index]
    // Get current font size
    const fontSize = window.getComputedStyle(node).fontSize
    // Replace font size with new value
    return fontSize.replace(
      /^([0-9.]+)(.+)$/,
      ($0, $1, $2) =>
        `${
          // Scale font size to fit circle
          (parseFloat($1) * (data.r * 2 * 0.9)) / node.getBBox().width
        }${$2}`
    )
  }

  // Update CSS variables according to zoom
  updateCSSVariables() {
    const { element, zoomScale } = this.graph
    element.style.setProperty('--zoom-scale', zoomScale.toString())

    // Prevent from interacting with members when zoom < 1
    element.style.setProperty(
      '--member-pointer-events',
      zoomScale > 1 ? 'auto' : 'none'
    )
  }

  // Debounce CSS variables updates for Safari because it's slow
  updateCSSVariablesDebounced = isSafari
    ? debounce(this.updateCSSVariables, 50)
    : this.updateCSSVariables

  // Cursor depending on ctrl and shift keys
  // It's useful for the drag behavior
  private updateCursor(event: KeyboardEvent) {
    const {
      onCircleClick,
      onCircleMove,
      onCircleCopy,
      onMemberClick,
      onMemberMove,
      onMemberAdd,
    } = this.graph.params.events
    const canClick = !!(onCircleClick && onMemberClick)
    const canMove = !!(onCircleMove && onMemberMove)
    const canCopy = !!(onCircleCopy && onMemberAdd)

    const shift = event.shiftKey
    const ctrl = event.ctrlKey || event.metaKey
    let cursor = this.cursor

    if (canCopy && ctrl && shift) {
      cursor = 'copy'
    } else if (canMove && ctrl) {
      cursor = 'grab'
    } else if (canClick) {
      cursor = 'pointer'
    } else {
      cursor = 'default'
    }
    if (this.cursor !== cursor) {
      this.cursor = cursor
      this.graph.element.style.setProperty('--circle-cursor', cursor)
    }
  }
}
