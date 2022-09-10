import { ColorMode } from '@chakra-ui/react'
import { format } from 'date-fns'

export const isMac = /Mac/i.test(navigator.platform)
export const isIOS = /(iPhone|iPod|iPad)/i.test(navigator.platform)

export const cmdOrCtrlKey = isMac ? '⌘' : 'Ctrl'

export enum UserLocalStorageKeys {
  AlgoliaConfig = 'algolia-config-{id}',
  MagicBellConfig = 'magicbell-config',
  OrgId = 'orgId',
  ThreadDrafts = 'thread-draft-{id}',
}

export function resetUserLocalStorage() {
  for (const key in localStorage) {
    for (const keyPattern of Object.values(UserLocalStorageKeys)) {
      if (
        new RegExp('^' + keyPattern.replace(/\{id\}/, '.*') + '$').test(key)
      ) {
        localStorage.removeItem(key)
      }
    }
  }
}

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

export function textEllipsis(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 1) + '…'
}
