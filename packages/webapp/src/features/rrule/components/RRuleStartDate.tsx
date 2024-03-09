import { Input } from '@chakra-ui/react'
import {
  getDateFromUTCDate,
  getUTCDateFromDate,
} from '@rolebase/shared/helpers/rrule'
import { getDateTimeLocal } from '@utils/dates'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FormRow } from './FormRow'
import { FormPartProps } from './RRuleEditor'

export default function RRuleStartDate({ options, onChange }: FormPartProps) {
  const { t } = useTranslation()

  const value = useMemo(
    () =>
      options.dtstart
        ? getDateTimeLocal(getDateFromUTCDate(options.dtstart))
        : '',
    [options.dtstart, options.tzid]
  )

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ dtstart: getUTCDateFromDate(new Date(event.target.value)) })
    },
    []
  )

  return (
    <FormRow label={t('RRuleEditor.startDate')}>
      <Input type="datetime-local" value={value} onChange={handleChange} />
    </FormRow>
  )
}
