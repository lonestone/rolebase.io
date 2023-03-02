import { ColorMode } from '@chakra-ui/react'

export interface ColorModeProps {
  colorMode: ColorMode
}

export const mode = (light: string, dark: string) => (props: ColorModeProps) =>
  props.colorMode === 'light' ? light : dark
