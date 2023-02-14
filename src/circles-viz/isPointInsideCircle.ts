export function isPointInsideCircle(
  pointX: number,
  pointY: number,
  centerX: number,
  centerY: number,
  radius: number
) {
  return (
    (pointX - centerX) * (pointX - centerX) +
      (pointY - centerY) * (pointY - centerY) <
    radius * radius
  )
}
