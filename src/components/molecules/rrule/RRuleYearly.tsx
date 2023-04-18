import { Select } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FormRow } from './FormRow'
import { FormPartProps } from './RRuleEditor'
import RRuleMonthly from './RRuleMonthly'
import useI18nMonths from './useI18nMonths'

export default function RRuleYearly({ options, onChange }: FormPartProps) {
  const { t } = useTranslation()
  const i18nMonths = useI18nMonths()

  return (
    <>
      <FormRow label={t('RRuleEditor.bymonth')}>
        <Select
          value={options.bymonth?.[0] || 0}
          onChange={(e) => onChange({ bymonth: [+e.target.value] })}
        >
          {i18nMonths.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </Select>
      </FormRow>

      <RRuleMonthly options={options} onChange={onChange} />
    </>
  )
}
