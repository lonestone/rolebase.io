import { Input } from '@chakra-ui/react'
import { getDateTimeLocal } from '@utils/dates'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FormRow } from './FormRow'
import { FormPartProps } from './RRuleEditor'

export default function RRuleStartDate({ options, onChange }: FormPartProps) {
  const { t } = useTranslation()

  const value = useMemo(
    () =>
      options.dtstart
        ? getDateTimeLocal(
            zonedTimeToUtc(options.dtstart, options.tzid || 'UTC')
          )
        : '',
    [options.dtstart, options.tzid]
  )

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        dtstart: utcToZonedTime(
          new Date(event.target.value),
          options.tzid || 'UTC'
        ),
      })
    },
    []
  )

  return (
    <FormRow label={t('RRuleEditor.startDate')}>
      <Input type="datetime-local" value={value} onChange={handleChange} />
    </FormRow>
  )
}
