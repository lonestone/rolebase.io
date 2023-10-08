import { DateTimeTimeZone } from '@microsoft/microsoft-graph-types-beta'
import { dateFromTimeZone } from '@shared/helpers/rrule'

export function isDateTimeEqual(
  date1?: DateTimeTimeZone | null,
  date2?: DateTimeTimeZone | null
) {
  return (
    date1?.dateTime &&
    date1?.timeZone &&
    date2?.dateTime &&
    date2?.timeZone &&
    dateFromTimeZone(
      new Date(date1?.dateTime),
      date1?.timeZone,
      true
    ).toISOString() ===
      dateFromTimeZone(
        new Date(date2?.dateTime),
        date2?.timeZone,
        true
      ).toISOString()
  )
}
