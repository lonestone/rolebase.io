import { CircleFullFragment } from '@gql'
import { Participant } from '@shared/model/member'
import { textEllipsis } from '@utils/textEllipsis'
import * as d3 from 'd3'
import { HierarchyNode } from 'd3'
import { ContainerCircleElement } from './circle-elements/ContainerCircleElement'
import { MemberCircleElement } from './circle-elements/MemberCircleElement'
import { MouseCircleElement } from './circle-elements/MouseCircleElement'
import { ParticipantsCircleElement } from './circle-elements/ParticipantsCircleElement'
import { TitleCircleElement } from './circle-elements/TitleCircleElement'
import { Graph } from './Graph'
import { getCenterFontSize, getCenterNameOpacity } from './helpers/circleName'
import { createMoveTransition } from './helpers/createTransition'
import selectAppend from './helpers/selectAppend'
import settings from './settings'
import { Data, NodeData, NodeType } from './types'

export interface CircleData extends CircleFullFragment {
  participants?: Participant[]
}

export abstract class CirclesGraph extends Graph {
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
          name: textEllipsis(circle.role.name, 20),
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
          memberId: entry.memberId,
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
    const { zoom } = this

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

    // Set focus functions
    const focusCircle = (
      node: NodeData = root,
      adaptScale?: boolean,
      instant?: boolean
    ) => {
      if (node.r > 0) {
        zoom.to(
          node.x,
          node.y,
          adaptScale ? Math.max(100, node.r * 1.1) : 0,
          instant
        )
      }
    }

    // Change zoom extent
    zoom.changeExtent(root.r * 2, root.r * 2)

    // Set function to zoom on a circle
    zoom.focusCircle = (circleId = root.data.id, adaptScale, instant) => {
      const circle = nodesMap.find((c) => c.data.id === circleId)
      if (!circle) return
      focusCircle(circle, adaptScale, instant)
    }

    // Set function to zoom on a circle after redraw
    zoom.focusCircleAfterDraw = (...args) =>
      this.addDrawListener(
        () => setTimeout(() => zoom.focusCircle?.(...args), 100),
        true
      )

    // Zoom on root circle at first draw
    if (firstDraw) {
      setTimeout(() => focusCircle(root, true, true), 0)
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

    this.drawCircleNames(svg, nodesMap)
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
            .attr('font-size', '1em')
            .attr('font-size', getCenterFontSize)
            .attr('opacity', getCenterNameOpacity)

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
            .attr('font-size', '1em')
            .attr('font-size', getCenterFontSize)
            .attr('opacity', getCenterNameOpacity)
          return nodeUpdate
        },
        (nodeExit) => nodeExit.remove()
      )
  }
}
