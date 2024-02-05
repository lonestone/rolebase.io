import { CircleFullFragment } from '@gql'
import { omit } from '@utils/omit'
import { HierarchyNode } from 'd3-hierarchy'
import uniqBy from 'lodash.uniqby'
import { Data, GraphParams, RootElement } from '../types'
import { CircleData, CirclesGraph } from './CirclesGraph'

export class MembersGraph extends CirclesGraph {
  constructor(element: RootElement, params: GraphParams) {
    // Remove copy and move events in this view
    const newParams = {
      ...params,
      events: omit(params.events, 'onCircleCopy', 'onCircleMove'),
    }

    super(element, newParams)
  }

  protected packSorting(
    a: HierarchyNode<Data>,
    b: HierarchyNode<Data>
  ): number {
    return (
      // Stabilize sorting with ids
      a.data.id.localeCompare(b.data.id)
    )
  }

  // Get all circles in a flat array, with leaders
  protected getCircles(circles: CircleFullFragment[]): CircleData[] {
    const rootCircle = circles.find((c) => c.parentId === null)
    if (!rootCircle) return []

    // Find all unique members from circles
    const members = uniqBy(
      circles.flatMap((circle) => circle.members),
      'member.id'
    )

    return [
      {
        ...rootCircle,
        members,
      },
    ]
  }
}
