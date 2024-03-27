import { DateTimeTimeZone } from '@microsoft/microsoft-graph-types-beta'
import { zonedTimeToUtc } from 'date-fns-tz'

export function dateTimeToDate(dateTime: DateTimeTimeZone | null | undefined) {
  if (!dateTime?.dateTime) return undefined
  return zonedTimeToUtc(new Date(dateTime.dateTime), dateTime.timeZone || 'UTC')
}
