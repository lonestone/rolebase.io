import { ColorMode } from '@chakra-ui/react'
import { format } from 'date-fns'

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// From https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local
export function getDateTimeLocal(date: Date) {
  return format(date, "yyyy-MM-dd'T'HH:mm", {})
}

export interface ColorModeProps {
  colorMode: ColorMode
}

export const mode = (light: string, dark: string) => (props: ColorModeProps) =>
  props.colorMode === 'light' ? light : dark

export function readFile(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener(
      'load',
      () => resolve(reader.result as string | null),
      false
    )
    reader.readAsDataURL(file)
  })
}
