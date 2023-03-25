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

export function excludeMeetingsFromRRule(
  rrule: RRule | string,
  meetings: Array<{ recurringDate?: string | null }>
): RRule {
  const rruleSet = new RRuleSet()
  rruleSet.rrule(typeof rrule === 'string' ? RRule.fromString(rrule) : rrule)

  // Exclude dates of meetings from the serie
  for (const meeting of meetings) {
    if (!meeting.recurringDate) continue
    rruleSet.exdate(getUTCDateFromDate(new Date(meeting.recurringDate)))
  }

  return rruleSet
}
