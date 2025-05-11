import {
  circleColor,
  defaultCircleColorHue,
} from '@rolebase/shared/helpers/circleColor'

const depthColorVariation = 5

export const getLightColor = (
  lightness: number,
  depth = 1,
  hue = defaultCircleColorHue
) => circleColor(lightness - (depth - 1) * depthColorVariation, hue)

export const getDarkColor = (
  lightness: number,
  depth = 1,
  hue = defaultCircleColorHue
) => circleColor(lightness + (depth - 1) * depthColorVariation, hue)

export const getColor = (
  mode: 'light' | 'dark',
  lightnessLight: number,
  lightnessDark: number,
  depth = 1,
  hue = defaultCircleColorHue
) =>
  mode === 'light'
    ? getLightColor(lightnessLight, depth, hue)
    : getDarkColor(lightnessDark, depth, hue)
