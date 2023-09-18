import { RRule } from 'rrule'

export const getDefaultDigestRRule = (dtstart: string) =>
  new RRule({
    dtstart: new Date(dtstart),
    freq: RRule.WEEKLY,
    byweekday: [0, 1, 2, 3, 4],
  })
