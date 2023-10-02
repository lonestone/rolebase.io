import type {
  DayOfWeek,
  PatternedRecurrence,
  RecurrencePattern,
  RecurrenceRange,
} from '@microsoft/microsoft-graph-types-beta'
import { Frequency, RRule } from 'rrule'

export function transformRRuleToRecurrence(
  rrule: RRule | undefined
): PatternedRecurrence | undefined {
  if (!rrule) return
  const pattern = rruleToRecurrencePattern(rrule)
  const range = rruleToRecurrenceRange(rrule)
  if (!pattern || !range) return
  return { pattern, range }
}

const weekDays: DayOfWeek[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]
const indexes = {
  [-1]: 'last',
  1: 'first',
  2: 'second',
  3: 'third',
  4: 'fourth',
}

function rruleToRecurrencePattern(rrule: RRule): RecurrencePattern | undefined {
  const { freq, interval, byweekday, bymonthday, bysetpos } = rrule.options

  // Daily
  if (freq === Frequency.DAILY) {
    return {
      type: 'daily',
      interval,
    }
  }

  // Weekly
  if (freq === Frequency.WEEKLY && Array.isArray(byweekday)) {
    return {
      type: 'weekly',
      interval,
      daysOfWeek: byweekday.map((day) => weekDays[day]),
    }
  }

  // Monthly
  if (freq === Frequency.MONTHLY) {
    if (bymonthday[0] !== undefined) {
      return {
        type: 'absoluteMonthly',
        interval,
        dayOfMonth: bymonthday[0],
      }
    } else {
      return {
        type: 'relativeMonthly',
        interval,
        index: indexes[bysetpos ? bysetpos[0] : 1] ?? 'first',
        daysOfWeek: byweekday.map((day) => weekDays[day]),
      }
    }
  }

  // Yearly
  if (freq === Frequency.YEARLY) {
    if (bymonthday[0] !== undefined) {
      return {
        type: 'absoluteYearly',
        interval,
        dayOfMonth: bymonthday[0],
      }
    } else {
      return {
        type: 'relativeYearly',
        interval,
        index: indexes[bysetpos ? bysetpos[0] : 1] ?? 'first',
        daysOfWeek: byweekday.map((day) => weekDays[day]),
      }
    }
  }
}

function rruleToRecurrenceRange(rrule: RRule): RecurrenceRange {
  const { tzid, dtstart } = rrule.options
  return {
    type: 'noEnd',
    startDate: dtstart.toISOString().split('T')[0],
    recurrenceTimeZone: tzid || 'UTC',
  }
}
