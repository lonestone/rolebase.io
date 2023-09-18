import { CircleFullFragment } from '@gql'

export function fixCirclesHue(
  circles: CircleFullFragment[],
  parentId: string | null = null,
  hue?: number
): CircleFullFragment[] {
  const circlesSelection = circles.filter((c) => c.parentId === parentId)
  return [
    ...circlesSelection.map((c) =>
      typeof c.role.colorHue === 'number'
        ? c
        : {
            ...c,
            role: { ...c.role, colorHue: hue },
          }
    ),
    ...circlesSelection.flatMap((c) =>
      fixCirclesHue(circles, c.id, c.role.colorHue ?? hue)
    ),
  ]
}
