import {
  AVATAR_GRAPH_WIDTH,
  getResizedImageUrl,
} from '@/common/api/storage_images'
import { CircleFullFragment } from '@gql'
import { getCircleParticipants } from '@rolebase/shared/helpers/getCircleParticipants'
import { truthy } from '@rolebase/shared/helpers/truthy'
import { Participant } from '@rolebase/shared/model/member'
import { textEllipsis } from '@utils/textEllipsis'
import * as d3 from 'd3'
import { HierarchyNode } from 'd3'
import settings from '../settings'
import { Data, GraphParams, NodeType, RootElement } from '../types'
import { Graph } from './Graph'

export interface CircleData extends CircleFullFragment {
  participants?: Participant[]
}

export abstract class CirclesGraph extends Graph<CircleFullFragment[]> {
  public origCircles: CircleFullFragment[] = []

  constructor(
    element: RootElement,
    public params: GraphParams
  ) {
    super(element, params)
  }

  destroy() {
    // @ts-ignore
    this.element = undefined
    // @ts-ignore
    this.params = undefined
    // @ts-ignore
    this.origCircles = undefined

    super.destroy()
  }

  protected abstract getCircles(circles: CircleFullFragment[]): CircleData[]
  protected abstract packSorting(
    a: HierarchyNode<Data>,
    b: HierarchyNode<Data>
  ): number

  protected prepareData(circles: CircleFullFragment[]): Data {
    this.origCircles = circles
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
          entityId: circle.id,
          parentId: circle.parentId,
          name: circle.role.name,
          type: NodeType.Circle,
          colorHue: circle.role.colorHue ?? undefined,
        }

        // Add sub-circles to children
        const children: Data[] = this.prepareDataInternal(circles, circle.id)

        // Add circle links
        if (circle.invitedCircleLinks.length !== 0) {
          children.push(...this.circleLinksToData(circle, this.origCircles))
        }

        // Add members in a circle to group them
        if (circle.members.length !== 0 || children.length === 0) {
          children.push(this.membersToData(circle, data.colorHue))
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

  protected membersToData(circle: CircleFullFragment, colorHue?: number): Data {
    const node: Data = {
      id: `${circle.id}-members`,
      parentId: circle.id,
      name: '',
      type: NodeType.MembersCircle,
    }
    if (circle.members.length !== 0) {
      node.children = circle.members.map(
        (entry): Data => ({
          id: entry.id,
          entityId: entry.member.id,
          parentId: circle.id,
          name: textEllipsis(entry.member.name, 20),
          picture: getResizedImageUrl(entry.member.picture, AVATAR_GRAPH_WIDTH),
          type: NodeType.Member,
          colorHue,
        })
      )
    }
    return node
  }

  protected circleLinksToData(
    circle: CircleFullFragment,
    circles: CircleFullFragment[]
  ): Data[] {
    return circle.invitedCircleLinks
      .map(({ invitedCircle: { id } }): Data | undefined => {
        const invitedCircle = circles.find((c) => c.id === id)
        if (!invitedCircle) return

        const colorHue =
          invitedCircle.role.colorHue ?? circle.role.colorHue ?? undefined
        const participants = getCircleParticipants(invitedCircle, circles)

        return {
          id: `${circle.id}_${id}`,
          entityId: id,
          parentId: circle.id,
          name: invitedCircle.role.name,
          type: NodeType.Circle,
          colorHue,
          participants,
          // Add empty children for padding
          children: [
            {
              id: `${circle.id}_${id}-members`,
              parentId: circle.id,
              name: '',
              type: NodeType.MembersCircle,
            },
          ],
        }
      })
      .filter(truthy)
  }

  private packData(data: Data) {
    const hierarchyNode = d3
      .hierarchy(data)
      .sum((d) => d.value || 0)
      .sort(this.packSorting)

    return (
      d3
        .pack<Data>()
        .radius(() => settings.memberValue)
        .padding((d) => {
          // Circle
          if (d.data.type === NodeType.Circle) {
            const hasSubCircles = d.data.children?.some(
              (c) => c.type === NodeType.Circle
            )
            if (!hasSubCircles) return settings.padding.circleWithoutSubCircle
            const multipleChildren = (d.data.children?.length || 0) > 1
            return multipleChildren
              ? settings.padding.circleWithSubCircles
              : settings.padding.circleWithSingleSubCircle
          } else if (d.data.type === NodeType.MembersCircle) {
            // Members Circle
            return settings.padding.membersCircle
          }
          return 0
        })(hierarchyNode)

        // Sort by depth and Y, then raise
        .sort((a, b) =>
          a.depth === b.depth ? a.y - b.y : a.depth < b.depth ? -1 : 1
        )
    )
  }

  updateData(circles: CircleFullFragment[]) {
    const firstDraw = !this.inputData
    super.updateData(circles)
    const data = this.prepareData(circles)

    // Pack data with d3.pack
    const root = this.packData(data)

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
    this.updateRootRadius(nodesMap[1]?.r || nodesMap[0]?.r || 0)

    // Zoom on root circle at first draw
    if (firstDraw) {
      setTimeout(
        () => this.zoomTo(root.x, root.y, this.focusCircleScale(root)),
        0
      )
    }

    // Save and dispatch nodes data
    this.nodes = nodesMap.slice(1)
    this.emit('nodesData', this.nodes)
  }
}
