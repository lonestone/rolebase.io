import { format, fromUnixTime, Locale } from 'date-fns'
import { capitalizeFirstLetter } from './capitalizeFirstLetter'

export function formatSearchDate(date: number | string, dateLocale: Locale) {
  if (!date) return

  return capitalizeFirstLetter(
    format(
      typeof date === 'string'
        ? new Date(date)
        : new Date(fromUnixTime(date as number)),
      'PPPP',
      {
        locale: dateLocale,
      }
    )
  )
}
