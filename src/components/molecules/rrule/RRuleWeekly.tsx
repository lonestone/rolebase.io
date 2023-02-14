import { Button, Flex } from '@chakra-ui/react'
import React, { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { FormRow } from './FormRow'
import { FormPartProps } from './RRuleEditor'
import useI18nDays from './useI18nDays'

export default function RRuleWeekly({ options, onChange }: FormPartProps) {
  const { t } = useTranslation()
  const i18nDays = useI18nDays()

  const toggleByWeekDay: MouseEventHandler<HTMLButtonElement> = (e) => {
    const weekday = +(e.target as any).value
    const index = options.byweekday?.findIndex((d) => d === weekday)
    if (index === -1 || index === undefined) {
      onChange({ byweekday: (options.byweekday || []).concat(weekday) })
    } else {
      onChange({
        byweekday: options.byweekday?.filter((d) => d !== weekday),
      })
    }
  }

  return (
    <FormRow label={t('RRuleEditor.byweekday')}>
      <Flex>
        {i18nDays.map((day, index) => (
          <Button
            key={index}
            value={index}
            variant={options.byweekday?.includes(index) ? 'solid' : 'ghost'}
            onClick={toggleByWeekDay}
          >
            {day.substring(0, 2)}
          </Button>
        ))}
      </Flex>
    </FormRow>
  )
}
