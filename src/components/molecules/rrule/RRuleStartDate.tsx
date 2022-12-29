import { Input } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { getDateTimeLocal } from 'src/utils/getDateTimeLocal'
import { FormRow } from './FormRow'
import { FormPartProps } from './RRuleEditor'

export default function RRuleStartDate({ options, onChange }: FormPartProps) {
  const { t } = useTranslation()

  return (
    <FormRow label={t('RRuleEditor.startDate')}>
      <Input
        type="datetime-local"
        value={options.dtstart && getDateTimeLocal(options.dtstart)}
        onChange={(e) => onChange({ dtstart: new Date(e.target.value) })}
      />
    </FormRow>
  )
}
