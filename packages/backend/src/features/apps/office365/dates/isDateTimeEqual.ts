import { DateTimeTimeZone } from '@microsoft/microsoft-graph-types-beta'
import { dateTimeToDate } from './dateTimeToDate'

export function isDateTimeEqual(
  dateTime1?: DateTimeTimeZone | null | undefined,
  dateTime2?: DateTimeTimeZone | null | undefined
) {
  return (
    dateTimeToDate(dateTime1)?.getTime() ===
    dateTimeToDate(dateTime2)?.getTime()
  )
}
