import { DateTimeTimeZone } from '@microsoft/microsoft-graph-types-beta'
import { dateToTimeZone } from '@shared/helpers/rrule'

export function dateTimeToDate(dateTime: DateTimeTimeZone | null | undefined) {
  if (!dateTime?.dateTime) return undefined
  return dateTime.timeZone
    ? dateToTimeZone(new Date(dateTime.dateTime), dateTime.timeZone, true)
    : new Date(dateTime.dateTime)
}

export function isDateTimeEqual(
  dateTime1?: DateTimeTimeZone | null | undefined,
  dateTime2?: DateTimeTimeZone | null | undefined
) {
  return (
    dateTimeToDate(dateTime1)?.getTime() ===
    dateTimeToDate(dateTime2)?.getTime()
  )
}
