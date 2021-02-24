import { BaseType, HierarchyCircularNode, Selection } from 'd3'

// https://observablehq.com/@d3/circle-packing
// https://observablehq.com/@d3/zoomable-circle-packing
// https://wattenberger.com/blog/react-and-d3

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
  type: NodeType
  value?: number
  children?: Array<Data>
}
