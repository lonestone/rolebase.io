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
  parentCircleId?: string | null
  name: string
  picture?: string | null
  type: NodeType
  colorHue?: number
  value?: number
  children?: Array<Data>
}

export interface Zoom {
  x: number
  y: number
  width: number
  height: number
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
  focusCircle?(
    circleId: string | undefined,
    adaptScale?: boolean,
    instant?: boolean
  ): void
  focusCircleAfterDraw?(
    circleId: string | undefined,
    adaptScale?: boolean,
    instant?: boolean
  ): void
}

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
