import { ColorMode } from '@chakra-ui/react'
import { Participant } from '@rolebase/shared/model/member'
import { BaseType, HierarchyCircularNode, Selection } from 'd3'

export interface GraphParams {
  width: number
  height: number
  colorMode: ColorMode
  zoomDisabled?: boolean
  focusCircleScale?: (node: NodeData) => number
  focusCrop?: Position
  events: GraphEvents
}

export enum GraphRenderer {
  SVG = 'SVG',
  Canvas = 'Canvas',
}

export type RootElement = HTMLCanvasElement | SVGSVGElement

export enum NodeType {
  Circle = 'Circle',
  MembersCircle = 'MembersCircle',
  Member = 'Member',
}

export type NodeData = HierarchyCircularNode<Data>
export type NodesSelection = Selection<SVGGElement, NodeData, BaseType, unknown>

export interface Data {
  id: string
  entityId?: string
  parentId?: string | null
  name: string
  picture?: string | null
  type: NodeType
  colorHue?: number
  value?: number
  children?: Array<Data>
  participants?: Participant[]
}

export enum CirclesGraphViews {
  AllCircles = 'AllCircles',
  SimpleCircles = 'SimpleCircles',
  FlatCircle = 'FlatCircle',
  Members = 'Members',
}

export interface GraphEvents {
  onCircleClick?(circleId: string): void
  onCircleMove?(circleId: string, targetCircleId: string | null): Promise<void>
  onCircleCopy?(
    circleId: string,
    targetCircleId: string | null
  ): Promise<string | undefined>
  onMemberClick?(circleId: string, memberId: string): void
  onMemberMove?(
    memberId: string,
    parentCircleId: string,
    targetCircleId: string | null
  ): Promise<void>
  onMemberAdd?(memberId: string, targetCircleId: string): Promise<void>
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
