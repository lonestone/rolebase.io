import { describe, expect, it } from 'vitest'
import { RRuleUTC } from './RRuleUTC'

// RRule tests
// London : UTC+0 before March 30th, then UTC+1
// Kiev : UTC+2 before March 30th, then UTC+3
const rruleLondon = `DTSTART;TZID=Europe/London:20240311T100000
RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR`
const rruleKiev = `DTSTART;TZID=Europe/Kiev:20240311T100000
RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR`

describe('rrule', () => {
  it('next date London', () => {
    const rrule = new RRuleUTC(rruleLondon)
    expect(rrule.after('2024-04-01T08:59:00.000Z')?.toISOString()).toEqual(
      '2024-04-01T09:00:00.000Z'
    )
    expect(rrule.after('2024-04-01T09:01:00.000Z')?.toISOString()).toEqual(
      '2024-04-02T09:00:00.000Z'
    )
  })

  it('next date Kiev', () => {
    const rrule = new RRuleUTC(rruleKiev)
    expect(rrule.after('2024-04-01T06:59:00.000Z')?.toISOString()).toEqual(
      '2024-04-01T07:00:00.000Z'
    )
    expect(rrule.after('2024-04-01T07:01:00.000Z')?.toISOString()).toEqual(
      '2024-04-02T07:00:00.000Z'
    )
  })

  it('change start date London', () => {
    const rrule = new RRuleUTC(rruleLondon)
    const nextDate = rrule.after('2024-04-01T08:59:00.000Z') || new Date()
    rrule.changeStartDate(nextDate)
    expect(rrule.toString()).toEqual(
      rruleLondon.replace('20240311', '20240401')
    )
  })

  it('change start date Kiev', () => {
    const rrule = new RRuleUTC(rruleKiev)
    const nextDate = rrule.after('2024-04-01T06:59:00.000Z') || new Date()
    rrule.changeStartDate(nextDate)
    expect(rrule.toString()).toEqual(rruleKiev.replace('20240311', '20240401'))
  })

  it('exclude meetings London', () => {
    const rrule = new RRuleUTC(rruleLondon)
    const dates = ['2024-03-13T10:00:00.000Z', '2024-03-14T10:00:00.000Z']
    rrule.excludeDates(dates)
    expect(
      rrule
        .between('2024-03-12T09:59:00.000Z', '2024-03-15T10:01:00.000Z')
        .map((date) => date.toISOString())
    ).toEqual(['2024-03-12T10:00:00.000Z', '2024-03-15T10:00:00.000Z'])
  })

  it('exclude meetings Kiev', () => {
    const rrule = new RRuleUTC(rruleKiev)
    rrule.excludeDates(['2024-03-13T08:00:00.000Z', '2024-03-14T08:00:00.000Z'])
    expect(
      rrule
        .between('2024-03-12T07:59:00.000Z', '2024-03-15T08:01:00.000Z')
        .map((date) => date.toISOString())
    ).toEqual(['2024-03-12T08:00:00.000Z', '2024-03-15T08:00:00.000Z'])
  })
})
