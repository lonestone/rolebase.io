import { describe, expect, it } from 'vitest'
import { dateToTimeZone, getUTCDateFromDate } from './rrule'

describe('dateToTimeZone', () => {
  it('Paris/Europe', () => {
    expect(
      dateToTimeZone(
        getUTCDateFromDate(new Date('2023-10-31T10:30:00.000Z')),
        'Europe/Paris'
      ).toISOString()
    ).toEqual('2023-10-31T11:30:00.000Z')
  })
})
