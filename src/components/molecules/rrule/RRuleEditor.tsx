import { VStack } from '@chakra-ui/react'
import { getTimeZone } from '@utils/dates'
import { pick } from '@utils/pick'
import React, { useCallback, useMemo } from 'react'
import { RRule } from 'rrule'
import { Frequency, ParsedOptions } from 'rrule/dist/esm/types'
import RRuleEnd from './RRuleEnd'
import RRuleMonthly from './RRuleMonthly'
import RRuleRepeat from './RRuleRepeat'
import RRuleStartDate from './RRuleStartDate'
import RRuleWeekly from './RRuleWeekly'
import RRuleYearly from './RRuleYearly'

export interface RRuleEditorProps {
  value?: string
  onChange: (value: string) => void
}

export interface FormPartProps {
  options: Partial<ParsedOptions>
  onChange: (newOptions: Partial<ParsedOptions>) => void
}

const rruleParams: Array<keyof ParsedOptions> = [
  'freq',
  'dtstart',
  'interval',
  'count',
  'until',
  'bysetpos',
  'bymonth',
  'bymonthday',
  'bynmonthday',
  'byweekday',
]

export default function RRuleEditor({ value, onChange }: RRuleEditorProps) {
  const tzid = useMemo(() => getTimeZone(), [])

  // Build RRule options from value
  const options: Partial<ParsedOptions> = useMemo(() => {
    if (!value) {
      // Default options
      return {
        freq: 1,
        interval: 1,
        tzid,
      }
    }
    const rrule = RRule.fromString(value)
    return pick(rrule.options, ...rruleParams)
  }, [value])

  // Change some options on trigger onChange
  const changeOptions = useCallback(
    (newOptions: Partial<ParsedOptions>) => {
      const o = { ...options, ...newOptions }

      // Reset some parameters when changing frequency
      if (newOptions.freq !== undefined) {
        o.bysetpos = undefined
        o.byweekday = undefined
        o.bymonthday = undefined
        o.bymonth = undefined
      }

      // Set timezone
      if (!o.tzid) {
        o.tzid = tzid
      }

      onChange(new RRule(o).toString())
    },
    [options]
  )

  const bind = { options, onChange: changeOptions }

  return (
    <VStack align="stretch">
      <RRuleStartDate {...bind} />
      <RRuleRepeat {...bind} />

      {options.freq === Frequency.YEARLY && <RRuleYearly {...bind} />}
      {options.freq === Frequency.MONTHLY && <RRuleMonthly {...bind} />}
      {options.freq === Frequency.WEEKLY && <RRuleWeekly {...bind} />}

      <RRuleEnd {...bind} />
    </VStack>
  )
}
