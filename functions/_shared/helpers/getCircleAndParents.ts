import { CircleFragment } from '@gql'

// Find a circle and its parent
export function getCircleAndParents<Entry extends CircleFragment>(
  circles: Entry[],
  circleId: string
): Entry[] {
  // Find circle
  const circle = circles.find((c) => c.id === circleId)
  if (!circle) return []

  // Return circle and its parents
  if (circle.parentId) {
    return [...getCircleAndParents(circles, circle.parentId), circle]
  }
  return [circle]
}
