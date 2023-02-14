import { format } from 'date-fns'

// From https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local

export function getDateTimeLocal(date: Date) {
  return format(date, "yyyy-MM-dd'T'HH:mm", {})
}
