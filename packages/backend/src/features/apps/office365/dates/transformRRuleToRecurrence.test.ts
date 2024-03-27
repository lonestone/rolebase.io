import { PatternedRecurrence } from '@microsoft/microsoft-graph-types-beta'
import { RRule } from 'rrule'
import { describe, expect, it } from 'vitest'
import { transformRRuleToRecurrence } from './transformRRuleToRecurrence'

describe('Transform RRule to MS Graph Recurrence', () => {
  it('Daily', () => {
    const recurrence = transformRRuleToRecurrence(
      RRule.fromString(
        'DTSTART;TZID=Europe/Paris:20230812T103000\nRRULE:FREQ=DAILY;INTERVAL=2'
      )
    )

    expect(recurrence).toEqual({
      pattern: {
        type: 'daily',
        interval: 2,
      },
      range: {
        type: 'noEnd',
        startDate: '2023-08-12',
        recurrenceTimeZone: 'Europe/Paris',
      },
    } as PatternedRecurrence)
  })

  it('Weekly', () => {
    const recurrence = transformRRuleToRecurrence(
      RRule.fromString(
        'DTSTART;TZID=Europe/Paris:20230812T103000\nRRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=TU,TH'
      )
    )

    expect(recurrence).toEqual({
      pattern: {
        type: 'weekly',
        interval: 2,
        daysOfWeek: ['tuesday', 'thursday'],
      },
      range: {
        type: 'noEnd',
        startDate: '2023-08-12',
        recurrenceTimeZone: 'Europe/Paris',
      },
    } as PatternedRecurrence)
  })

  it('Monthly absolute', () => {
    const recurrence = transformRRuleToRecurrence(
      RRule.fromString(
        'DTSTART;TZID=Europe/Paris:20230812T103000\nRRULE:FREQ=MONTHLY;INTERVAL=2;BYMONTHDAY=12'
      )
    )

    expect(recurrence).toEqual({
      pattern: {
        type: 'absoluteMonthly',
        interval: 2,
        dayOfMonth: 12,
      },
      range: {
        type: 'noEnd',
        startDate: '2023-08-12',
        recurrenceTimeZone: 'Europe/Paris',
      },
    } as PatternedRecurrence)
  })

  it('Monthly relative', () => {
    const recurrence = transformRRuleToRecurrence(
      RRule.fromString(
        'DTSTART;TZID=Europe/Paris:20230812T103000\nRRULE:FREQ=MONTHLY;INTERVAL=2;BYWEEKDAY=TU;BYSETPOS=-1'
      )
    )

    expect(recurrence).toEqual({
      pattern: {
        type: 'relativeMonthly',
        interval: 2,
        daysOfWeek: ['tuesday'],
        index: 'last',
      },
      range: {
        type: 'noEnd',
        startDate: '2023-08-12',
        recurrenceTimeZone: 'Europe/Paris',
      },
    } as PatternedRecurrence)
  })

  it('Yearly absolute', () => {
    const recurrence = transformRRuleToRecurrence(
      RRule.fromString(
        'DTSTART;TZID=Europe/Paris:20230812T103000\nRRULE:FREQ=YEARLY;INTERVAL=2;BYMONTH=8;BYMONTHDAY=12'
      )
    )

    expect(recurrence).toEqual({
      pattern: {
        type: 'absoluteYearly',
        interval: 2,
        dayOfMonth: 12,
      },
      range: {
        type: 'noEnd',
        startDate: '2023-08-12',
        recurrenceTimeZone: 'Europe/Paris',
      },
    } as PatternedRecurrence)
  })

  it('Yearly relative', () => {
    const recurrence = transformRRuleToRecurrence(
      RRule.fromString(
        'DTSTART;TZID=Europe/Paris:20230812T103000\nRRULE:FREQ=YEARLY;INTERVAL=2;BYMONTH=8;BYWEEKDAY=TU;BYSETPOS=2'
      )
    )

    expect(recurrence).toEqual({
      pattern: {
        type: 'relativeYearly',
        interval: 2,
        daysOfWeek: ['tuesday'],
        index: 'second',
      },
      range: {
        type: 'noEnd',
        startDate: '2023-08-12',
        recurrenceTimeZone: 'Europe/Paris',
      },
    } as PatternedRecurrence)
  })
})
