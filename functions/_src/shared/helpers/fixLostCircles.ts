import { CircleFullFragment } from '@gql'

// Move lost circles to root

export function fixLostCircles(
  circles: CircleFullFragment[]
): CircleFullFragment[] {
  return circles.map((circle) => {
    if (!circles.find((c) => c.id === circle.parentId)) {
      return { ...circle, parentId: null }
    }
    return circle
  })
}
