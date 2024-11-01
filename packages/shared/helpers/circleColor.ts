export const defaultCircleColorHue = 200

export function circleColor(
  lightness: number | string,
  hue: number | string = defaultCircleColorHue
) {
  const s =
    typeof lightness === 'number'
      ? `${lightness / 2 + 25}%`
      : `calc(${lightness} / 2 + 25%)`
  const l = typeof lightness === 'number' ? `${lightness}%` : lightness

  return `hsl(${hue} ${s} ${l})`
}
