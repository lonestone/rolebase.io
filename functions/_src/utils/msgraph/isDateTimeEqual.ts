import { DateTimeTimeZone } from '@microsoft/microsoft-graph-types-beta'
import { dateToTimeZone } from '@shared/helpers/rrule'

export function isDateTimeEqual(
  date1?: DateTimeTimeZone | null,
  date2?: DateTimeTimeZone | null
) {
  return (
    date1?.dateTime &&
    date1?.timeZone &&
    date2?.dateTime &&
    date2?.timeZone &&
    dateToTimeZone(
      new Date(date1?.dateTime),
      date1?.timeZone,
      true
    ).toISOString() ===
      dateToTimeZone(
        new Date(date2?.dateTime),
        date2?.timeZone,
        true
      ).toISOString()
  )
}
