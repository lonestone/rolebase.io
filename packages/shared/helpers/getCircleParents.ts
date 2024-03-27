import { CircleFragment } from '../gql'

// Find a circle and its parent
export function getCircleParents<Entry extends CircleFragment>(
  circles: Entry[],
  circle: Entry
): Entry[] {
  // Find circle
  const parentCircle = circles.find((c) => c.id === circle.parentId)
  if (!parentCircle) return []

  // Return circle and its parents
  if (parentCircle.parentId) {
    return [...getCircleParents(circles, parentCircle), parentCircle]
  }
  return [parentCircle]
}
