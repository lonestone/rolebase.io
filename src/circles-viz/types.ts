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
