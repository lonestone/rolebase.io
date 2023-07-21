import { Participant } from '@shared/model/member'
import { BaseType, HierarchyCircularNode, Selection } from 'd3'

export enum NodeType {
  Circle = 'Circle',
  MembersCircle = 'MembersCircle',
  Member = 'Member',
}

export type NodeData = HierarchyCircularNode<Data>
export type NodesSelection = Selection<SVGGElement, NodeData, BaseType, unknown>

export interface Data {
  id: string
  memberId?: string
  parentId?: string | null
  name: string
  picture?: string | null
  type: NodeType
  colorHue?: number
  value?: number
  children?: Array<Data>
  participants?: Participant[]
}

export enum GraphViews {
  AllCircles = 'AllCircles',
  SimpleCircles = 'SimpleCircles',
  FlatCircle = 'FlatCircle',
  Members = 'Members',
}

export interface GraphParams {
  width: number
  height: number
  zoomDisabled?: boolean
  focusCircleScale?: (node: NodeData) => number
  focusCrop?: Position
  events: GraphEvents
}

export interface GraphEvents {
  onCircleClick?(circleId: string): void
  onCircleMove?(circleId: string, targetCircleId: string | null): void
  onCircleCopy?(
    circleId: string,
    targetCircleId: string | null
  ): Promise<string | undefined>
  onMemberClick?(circleId: string, memberId: string): void
  onMemberMove?(
    memberId: string,
    parentCircleId: string,
    targetCircleId: string | null
  ): void
  onCircleAdd?(targetCircleId: string | null): void
  onMemberAdd?(memberId: string, targetCircleId: string): void
  onClickOutside?(): void
}

export interface Zoom {
  x: number
  y: number
  width: number
  height: number
  focusCircleScale: ZoomFocusCircleScale
  focusCrop: Position
  focusOffsetX: number
  focusOffsetY: number
  scale: number
  disabled: boolean
  to(x: number, y: number, radius?: number, instant?: boolean): void
  changeExtent(width: number, height: number): void
  changeDimensions: (
    width: number,
    height: number,
    focusCrop?: Position
  ) => void
  focusNode(node: NodeData, adaptScale?: boolean, instant?: boolean): void
  focusNodeId(nodeId: string, adaptScale?: boolean, instant?: boolean): void
}

export type ZoomFocusCircleScale = (node: NodeData) => number

export type DrawEventListener = (handler: () => void, once?: boolean) => void

export interface DrawEventHandler {
  once: boolean
  handler: () => void
}

export interface Position {
  top: number
  right: number
  bottom: number
  left: number
}
