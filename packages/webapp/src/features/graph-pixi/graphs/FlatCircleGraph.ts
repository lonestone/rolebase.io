import { CircleFullFragment } from '@gql'
import { getCircleParticipants } from '@shared/helpers/getCircleParticipants'
import { omit } from '@utils/omit'
import { HierarchyNode } from 'd3-hierarchy'
import { Data, GraphParams } from '../types'
import { CircleData, CirclesGraph } from './CirclesGraph'

export class FlatCircleGraph extends CirclesGraph {
  constructor(canvas: HTMLCanvasElement, params: GraphParams) {
    // Remove copy and move events in this view
    const newParams = {
      ...params,
      events: omit(params.events, 'onCircleCopy', 'onCircleMove'),
    }

    super(canvas, newParams)
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
    return circles
      .filter((circle) => !circle.role.base)
      .map((circle) => ({
        ...circle,
        parentId: null,
        members: [],
        participants: getCircleParticipants(circle.id, circles),
      }))
  }
}
