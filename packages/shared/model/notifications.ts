import { RRule } from 'rrule'

export const getDefaultDigestRRule = (dtstart: string) =>
  new RRule({
    dtstart: new Date(dtstart),
    freq: RRule.WEEKLY,
    byweekday: [RRule.MO, RRule.TH],
  })
