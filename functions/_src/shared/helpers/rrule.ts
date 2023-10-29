// RRule.js needs some special transformations to dates

import { RRule, RRuleSet } from 'rrule'

export function getDateFromUTCDate(date: Date): Date {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )
}

export function getUTCDateFromDate(date: Date): Date {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  )
}

// From https://github.com/jakubroztocil/rrule/blob/master/src/dateutil.ts
function dateTZtoISO8601(date: Date, timeZone: string) {
  // date format for sv-SE is almost ISO8601
  const dateStr = date.toLocaleString('sv-SE', { timeZone })
  // '2023-02-07 10:41:36'
  return dateStr.replace(' ', 'T') + 'Z'
}

// Inspired by dateInTimeZone from rrule.js
export function dateToTimeZone(
  date: Date,
  timeZone: string,
  inverse: boolean = false
) {
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  // Date constructor can only reliably parse dates in ISO8601 format
  const dateInLocalTZ = new Date(dateTZtoISO8601(date, localTimeZone))
  const dateInTargetTZ = new Date(dateTZtoISO8601(date, timeZone ?? 'UTC'))
  const tzOffset = dateInTargetTZ.getTime() - dateInLocalTZ.getTime()

  return new Date(date.getTime() + tzOffset * (inverse ? -1 : 1))
}

export function excludeMeetingsFromRRule(
  rrule: RRule | string,
  meetings: Array<{ recurringDate?: string | null }>
): RRuleSet {
  const rruleObj = typeof rrule === 'string' ? RRule.fromString(rrule) : rrule
  const rruleSet = new RRuleSet()
  rruleSet.rrule(rruleObj)

  // Exclude dates of meetings from the serie
  for (const meeting of meetings) {
    if (!meeting.recurringDate) continue
    const timezone = rruleObj.options.tzid
    if (!timezone) continue
    rruleSet.exdate(
      getUTCDateFromDate(
        dateToTimeZone(new Date(meeting.recurringDate), timezone)
      )
    )
  }

  return rruleSet
}
