export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// From https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local
export function getDateTimeLocal(date: Date) {
  const isoString = date.toISOString()
  return isoString.substring(0, ((isoString.indexOf('T') | 0) + 6) | 0)
}
