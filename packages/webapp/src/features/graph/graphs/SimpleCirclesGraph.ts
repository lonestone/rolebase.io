import { CircleFullFragment } from '@gql'
import { getCircleParticipants } from '@shared/helpers/getCircleParticipants'
import { HierarchyNode } from 'd3-hierarchy'
import { Data } from '../types'
import { AbstractCirclesGraph, CircleData } from './AbstractCirclesGraph'

export class SimpleCirclesGraph extends AbstractCirclesGraph {
  private circlesCache: CircleFullFragment[] | undefined

  selectCircle(id: string | undefined) {
    super.selectCircle(id)
    // Redraw graph
    if (this.circlesCache) {
      const data = this.prepareData(this.circlesCache)
      this.draw(data)
    }
  }

  protected prepareData(circles: CircleFullFragment[]) {
    this.circlesCache = circles
    return super.prepareData(circles)
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

  // Get subset of circles based on selected circle
  // Selected circle and all its parents are included with members.
  // Direct children of those circles are included, with participants and no members.
  protected getCircles(circles: CircleFullFragment[]): CircleData[] {
    // Get selected circle or root circle
    let circle = circles.find((c) =>
      this.selectedCircleId
        ? c.id === this.selectedCircleId
        : c.parentId === null
    )
    if (!circle) {
      console.error('Circle not found')
      return []
    }
    const result: CircleData[] = []
    let prevCircleId: string | undefined

    while (circle) {
      // Add circle children
      const children = circles.filter((c) => c.parentId === circle?.id)
      result.push(
        ...children.map((c) =>
          c.id === prevCircleId
            ? c
            : {
                ...c,
                members: [],
                participants: getCircleParticipants(c.id, circles),
              }
        )
      )

      const parent = circles.find((c) => c.id === circle?.parentId)
      // Add root circle
      if (!parent) {
        result.push(circle)
      }
      prevCircleId = circle.id
      circle = parent
    }
    return result
  }
}
