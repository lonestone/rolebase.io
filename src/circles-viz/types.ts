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
  parentCircleId: string | null
  name: string
  picture?: string | null
  type: NodeType
  value?: number
  children?: Array<Data>
}

export interface Dimensions {
  width: number
  height: number
}

export interface Zoom {
  x: number
  y: number
  scale: number
  spaceKey: boolean // True when space key is pressed
  to(x: number, y: number, radius?: number, instant?: boolean): void
  changeExtent(width: number, height: number): void
  focusCircle?(circleId: string, adaptScale?: boolean, instant?: boolean): void
}

export type DrawEventListener = (handler: () => void, once?: boolean) => void

export interface DrawEventHandler {
  once: boolean
  handler: () => void
}
