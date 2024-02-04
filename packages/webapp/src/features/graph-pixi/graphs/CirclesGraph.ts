import {
  AVATAR_GRAPH_WIDTH,
  getResizedImageUrl,
} from '@/common/api/storage_images'
import { CircleFullFragment } from '@gql'
import { Participant } from '@shared/model/member'
import { textEllipsis } from '@utils/textEllipsis'
import * as d3 from 'd3'
import { HierarchyNode } from 'd3'
import * as PIXI from 'pixi.js'
import { CircleObject } from '../nodes/CircleObject'
import { MemberObject } from '../nodes/MemberObject'
import { NodeObject } from '../nodes/NodeObject'
import settings from '../settings'
import { Data, NodeData, NodeType } from '../types'
import { Graph } from './Graph'

export interface CircleData extends CircleFullFragment {
  participants?: Participant[]
  invited?: boolean
}

const circleTextureSize = 512

export abstract class CirclesGraph extends Graph {
  protected nodeObjects = new Map<string, NodeObject>()

  // Shared textures
  public avatarsTextures = new Map<string, PIXI.RenderTexture>()
  private circleTexture: PIXI.RenderTexture | undefined

  protected abstract getCircles(ciùrcles: CircleFullFragment[]): CircleData[]
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

        // Add circle links
        // if (circle.invitedCircleLinks.length !== 0) {
        //   children.push(
        //     ...circle.invitedCircleLinks
        //       .map(({ invitedCircle: { id } }) => {
        //         const invitedCircle = circles.find((c) => c.id === id)
        //         if (!invitedCircle) return
        //         return {
        //           id: `${circle.id}_${id}`,
        //           parentId: circle.id,
        //           name: invitedCircle.role.name,
        //           type: NodeType.Circle,
        //           colorHue: invitedCircle.role.colorHue ?? undefined,
        //           children: invitedCircle.participants?.map((p) => ({
        //             id: `${circle.id}_${id}_${p.memberId}`,
        //             parentId: `${circle.id}_${id}`,
        //             name: p.member.name,
        //             type: NodeType.Member,
        //             memberId: p.memberId,
        //             picture: getResizedImageUrl(
        //               p.member.picture,
        //               AVATAR_GRAPH_WIDTH
        //             ),
        //             value: settings.memberValue,
        //             colorHue: invitedCircle.role.colorHue ?? undefined,
        //           })),
        //         }
        //       })
        //       .filter(truthy)
        //   )
        // }

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
          picture: getResizedImageUrl(entry.member.picture, AVATAR_GRAPH_WIDTH),
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
    const firstDraw = this.nodeObjects.size === 0

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
        () => this.zoomTo(root.x, root.y, this.focusCircleScale(root), true),
        0
      )
    }

    this.drawCircles(nodesMap)
  }

  protected drawCircles(nodesMap: NodeData[]) {
    // Add circle groups
    this.canvasD3
      .selectAll('circle')
      .data(nodesMap.slice(1), (d: any) => d.data.id)
      .join(
        // Create Circle
        (nodeEnter) => {
          return nodeEnter.append('circle').each((d) => {
            const nodeObject = this.nodeObjects.get(d.data.id)
            if (nodeObject) return
            if (d.data.type === NodeType.Circle) {
              this.nodeObjects.set(d.data.id, new CircleObject(this, d))
            } else if (d.data.type === NodeType.Member) {
              this.nodeObjects.set(d.data.id, new MemberObject(this, d))
            }
          })
        },

        // Update Circle
        (nodeUpdate) => {
          return nodeUpdate.each((d) => {
            const nodeObject = this.nodeObjects.get(d.data.id)
            nodeObject?.update(d)
          })
        },

        // Remove Circle
        (nodeExit) => {
          return nodeExit.each((d) => {
            const nodeObject = this.nodeObjects.get(d.data.id)
            if (nodeObject) {
              nodeObject.remove()
              this.nodeObjects.delete(d.data.id)
            }
          })
        }
      )
  }

  public getCircleTexture(): PIXI.RenderTexture {
    if (this.circleTexture) return this.circleTexture
    const shape = new PIXI.Graphics()
    shape.beginFill(0xffffff).drawCircle(0, 0, circleTextureSize)
    this.circleTexture = this.pixiApp.renderer.generateTexture(shape)
    shape.destroy()
    return this.circleTexture
  }
}
