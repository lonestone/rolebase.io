export const defaultCircleColorHue = 200

export const circleColor = (lightness: string, hue?: number | string) =>
  `hsl(${
    hue ?? defaultCircleColorHue
  } calc(${lightness} / 2 + 25%) ${lightness})`
