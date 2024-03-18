import isEqual from 'lodash.isequal'
import { RRule } from 'rrule'

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
