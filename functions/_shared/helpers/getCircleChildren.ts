import { CircleFragment } from '@gql'

// Find children of a circle
export function getCircleChildren<Entry extends CircleFragment>(
  circles: Entry[],
  circleId: string
): Entry[] {
  return circles
    .filter((c) => c.parentId === circleId)
    .flatMap((c) => getCircleChildren(circles, c.id).concat(c))
}
