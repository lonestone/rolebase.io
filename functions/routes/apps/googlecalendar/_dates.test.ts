import { describe, expect, it } from 'vitest'
import { dateTimeToDate } from './_dates'

describe('GoogleCalendar dateTimeToDate', () => {
  it('Paris/Europe', () => {
    expect(
      dateTimeToDate({
        dateTime: '2024-02-12T10:00:00',
        timeZone: 'Europe/Paris',
      })?.toISOString()
    ).toEqual('2024-02-12T09:00:00.000Z')

    expect(
      dateTimeToDate({
        dateTime: '2024-02-12T10:00:00+01:00',
        timeZone: 'Europe/Paris',
      })?.toISOString()
    ).toEqual('2024-02-12T09:00:00.000Z')
  })
})
