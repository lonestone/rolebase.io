import { CircleFullFragment } from '@gql'
import { HierarchyNode } from 'd3-hierarchy'
import { Data } from '../types'
import { AbstractCirclesGraph, CircleData } from './AbstractCirclesGraph'

export class AllCirclesGraph extends AbstractCirclesGraph {
  protected getCircles(circles: CircleFullFragment[]): CircleData[] {
    return circles
  }

  protected packSorting(
    a: HierarchyNode<Data>,
    b: HierarchyNode<Data>
  ): number {
    return (
      // Sort by value
      (a.value || 0) - (b.value || 0) ||
      // Stabilize sorting with ids
      a.data.id.localeCompare(b.data.id)
    )
  }
}
