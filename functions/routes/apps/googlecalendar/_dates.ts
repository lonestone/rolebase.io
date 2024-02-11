import { dateToTimeZone } from '@shared/helpers/rrule'
import { calendar_v3 } from 'googleapis'
import isEqual from 'lodash.isequal'
import { RRule } from 'rrule'

export function dateTimeToDate(
  dateTime: calendar_v3.Schema$EventDateTime | null | undefined
) {
  if (!dateTime?.dateTime) return undefined
  return dateTime.timeZone
    ? dateToTimeZone(
        new Date(dateTime.dateTime.substring(0, 19)),
        dateTime.timeZone,
        true
      )
    : new Date(dateTime.dateTime)
}

export function isDateTimeEqual(
  dateTime1?: calendar_v3.Schema$EventDateTime | null | undefined,
  dateTime2?: calendar_v3.Schema$EventDateTime | null | undefined
) {
  return (
    dateTimeToDate(dateTime1)?.getTime() ===
    dateTimeToDate(dateTime2)?.getTime()
  )
}

export function isRecurrenceEqual(
  rruleArray1: string[] | null | undefined,
  rruleArray2: string[] | null | undefined
) {
  const rrule1 = rruleArray1?.find((str) => str.startsWith('RRULE:'))
  const rrule2 = rruleArray2?.find((str) => str.startsWith('RRULE:'))
  if (!rrule1 && !rrule2) return true
  if (!rrule1 || !rrule2) return false

  return isEqual(
    RRule.fromString(rrule1).options,
    RRule.fromString(rrule2).options
  )
}
