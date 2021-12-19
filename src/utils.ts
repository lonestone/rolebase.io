import { format } from 'date-fns'

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// From https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local
export function getDateTimeLocal(date: Date) {
  return format(date, "yyyy-MM-dd'T'hh:mm")
}
