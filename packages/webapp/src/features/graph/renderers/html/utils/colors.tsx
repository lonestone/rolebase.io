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
