import { CircleFullFragment } from '@gql'
import { Participant } from '@shared/model/member'
import { textEllipsis } from '@utils/textEllipsis'
import * as d3 from 'd3'
import { HierarchyNode } from 'd3'
import { Graph } from '../Graph'
import { ContainerCircleElement } from '../circle-elements/ContainerCircleElement'
import { MemberCircleElement } from '../circle-elements/MemberCircleElement'
import { MouseCircleElement } from '../circle-elements/MouseCircleElement'
import { ParticipantsCircleElement } from '../circle-elements/ParticipantsCircleElement'
import { TitleCircleElement } from '../circle-elements/TitleCircleElement'
import { createMoveTransition } from '../helpers/createTransition'
import selectAppend from '../helpers/selectAppend'
import settings from '../settings'
import { Data, NodeData, NodeType } from '../types'

export interface CircleData extends CircleFullFragment {
  participants?: Participant[]
}

export abstract class AbstractCirclesGraph extends Graph {
  private circleElements = [
    new ContainerCircleElement(this),
    new TitleCircleElement(this),
    new ParticipantsCircleElement(this),
    new MemberCircleElement(this),
    new MouseCircleElement(this),
  ]

  protected abstract getCircles(circles: CircleFullFragment[]): CircleData[]
  protected abstract packSorting(
    a: HierarchyNode<Data>,
    b: HierarchyNode<Data>
  ): number

  protected prepareData(circles: CircleFullFragment[]): Data {
    return {
      id: 'root',
      parentId: null,
      type: NodeType.Circle,
      name: '',
      children: this.prepareDataInternal(this.getCircles(circles), null),
    }
  }

  private prepareDataInternal(
    circles: CircleData[],
    parentId: string | null = null
  ): Data[] {
    return circles
      .filter((circle) => circle.parentId == parentId)
      .map((circle) => {
        // Define circle data with role name
        const data: Data = {
          id: circle.id,
          parentId: circle.parentId,
          name: circle.role.name,
          type: NodeType.Circle,
          colorHue: circle.role.colorHue ?? undefined,
        }

        // Add sub-circles to children
        const children: Data[] = this.prepareDataInternal(circles, circle.id)

        // Add members in a circle to group them
        if (circle.members.length !== 0 || children.length === 0) {
          children.push(this.memberstoD3Data(circle, data.colorHue))
        }

        // Set children if there is at least one
        if (children.length !== 0) {
          data.children = children
        }

        if (circle.participants) {
          data.participants = circle.participants
        }

        return data
      })
  }

  protected memberstoD3Data(
    circle: CircleFullFragment,
    colorHue?: number
  ): Data {
    const node: Data = {
      id: `${circle.id}-members`,
      parentId: circle.id,
      name: '',
      type: NodeType.MembersCircle,
    }
    if (circle.members.length === 0) {
      node.value = settings.memberValue
    } else {
      node.children = circle.members.map(
        (entry): Data => ({
          id: entry.id,
          memberId: entry.member.id,
          parentId: circle.id,
          name: textEllipsis(entry.member.name, 20),
          picture: entry.member.picture,
          value: settings.memberValue,
          type: NodeType.Member,
          colorHue,
        })
      )
    }
    return node
  }

  private packData(data: Data) {
    const hierarchyNode = d3
      .hierarchy(data)
      .sum((d) => d.value || 0)
      .sort(this.packSorting)

    return d3
      .pack<Data>()
      .radius(() => settings.memberValue)
      .padding((d) => {
        // Circle
        const multipleChildren = (d.data.children?.length || 0) > 1
        if (d.data.type === NodeType.Circle) {
          const hasSubCircles = d.data.children?.some(
            (c) => c.type === NodeType.Circle
          )
          if (!hasSubCircles) return settings.padding.circleWithoutSubCircle
          return multipleChildren
            ? settings.padding.circleWithSubCircles
            : settings.padding.circleWithSingleSubCircle
        } else if (d.data.type === NodeType.MembersCircle) {
          // Members Circle
          return settings.padding.membersCircle
        }
        return 0
      })(hierarchyNode)
  }

  protected draw(data: Data) {
    // Pack data with d3.pack
    const root = this.packData(data)
    const svg = d3.select<SVGSVGElement, NodeData>(this.svg)
    const firstDraw = !svg.select('.circles').node()

    // Get all nodes under root and rescale them
    const nodesMap = root.descendants()
    const minRadius = nodesMap.reduce(
      (min, node) => (node.r < min ? node.r : min),
      Infinity
    )
    const nodeScale = 30 / minRadius
    for (const node of nodesMap) {
      node.r *= nodeScale
      node.x *= nodeScale
      node.y *= nodeScale
    }

    // Update root radius
    this.updateRootRadius(nodesMap[1].r)

    // Zoom on root circle at first draw
    if (firstDraw) {
      setTimeout(
        () => this.zoomTo(root.x, root.y, this.focusCircleScale(root)),
        0
      )
    }

    this.drawCircles(svg, nodesMap)
    this.drawCircleNames(svg, nodesMap)
  }

  protected drawCircles(
    svg: d3.Selection<SVGSVGElement, NodeData, null, undefined>,
    nodesMap: NodeData[]
  ) {
    // Add circle groups
    selectAppend(svg.select('.panzoom'), 'g', 'circles')
      .selectAll('.circle')
      .data(nodesMap.slice(1), (d: any) => d.data.id)
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

  private drawCircleNames(
    svg: d3.Selection<SVGSVGElement, NodeData, null, undefined>,
    nodesMap: NodeData[]
  ) {
    // Circles Names
    selectAppend(svg.select('.panzoom'), 'g', 'circles-names')
      .selectAll('.circle-name')
      .data(nodesMap.slice(1), (d: any) => d.data.id)
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
}
