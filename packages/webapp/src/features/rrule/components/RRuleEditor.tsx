import { Collapse, VStack } from '@chakra-ui/react'
import { getTimeZone } from '@utils/dates'
import { pick } from '@utils/pick'
import React, { useCallback, useEffect, useMemo } from 'react'
import { RRule } from 'rrule'
import { Frequency, ParsedOptions } from 'rrule/dist/esm/types'
import RRuleMonthly from './RRuleMonthly'
import RRuleNextDates from './RRuleNextDates'
import RRuleRepeat from './RRuleRepeat'
import RRuleStartDate from './RRuleStartDate'
import RRuleWeekly from './RRuleWeekly'
import RRuleYearly from './RRuleYearly'

export interface RRuleEditorProps {
  value?: string
  hideStartDate?: boolean
  onChange: (value: string) => void
}

export interface FormPartProps {
  options: Partial<ParsedOptions>
  onChange: (newOptions: Partial<ParsedOptions>) => void
}

const rruleParams: Array<keyof ParsedOptions> = [
  'freq',
  'tzid',
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

export default function RRuleEditor({
  value,
  hideStartDate,
  onChange,
}: RRuleEditorProps) {
  // Build RRule from value
  const rrule = useMemo(
    () => (typeof value === 'string' ? RRule.fromString(value) : undefined),
    [value]
  )

  // Build options from RRule
  const options: Partial<ParsedOptions> = useMemo(() => {
    if (!rrule) {
      // Default options
      return {
        freq: RRule.WEEKLY,
        interval: 1,
        tzid: getTimeZone(),
      }
    }
    return pick(rrule.options, ...rruleParams)
  }, [rrule])

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

      onChange(new RRule(o).toString())
    },
    [options]
  )

  // Force tzid
  useEffect(() => {
    if (!options.tzid) {
      changeOptions({ tzid: getTimeZone() })
    }
  }, [options])

  const bind = { options, onChange: changeOptions }

  return (
    <VStack align="stretch">
      {!hideStartDate && <RRuleStartDate {...bind} />}

      <Collapse in={!!options.dtstart}>
        <VStack align="stretch">
          <RRuleRepeat {...bind} />

          {options.freq === Frequency.YEARLY && <RRuleYearly {...bind} />}
          {options.freq === Frequency.MONTHLY && <RRuleMonthly {...bind} />}
          {options.freq === Frequency.WEEKLY && <RRuleWeekly {...bind} />}

          {/* Disabled because we don't need it and it can cause bugs
          <RRuleEnd {...bind} />
          */}

          {rrule && <RRuleNextDates rrule={rrule} />}
        </VStack>
      </Collapse>
    </VStack>
  )
}
