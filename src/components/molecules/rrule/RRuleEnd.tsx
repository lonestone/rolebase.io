import NumberInput from '@atoms/NumberInput'
import {
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
} from '@chakra-ui/react'
import { getDateTimeLocal } from '@utils/getDateTimeLocal'
import React, { ChangeEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { FormRow } from './FormRow'
import { FormPartProps } from './RRuleEditor'

enum EndTypes {
  NEVER = 'NEVER',
  COUNT = 'COUNT',
  UNTIL = 'UNTIL',
}

export default function RRuleEnd({ options, onChange }: FormPartProps) {
  const { t } = useTranslation()

  const toggleEnd: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const endType = e.target.value as EndTypes
    switch (endType) {
      case EndTypes.NEVER:
        onChange({ count: undefined, until: undefined })
        break
      case EndTypes.COUNT:
        onChange({ count: 1, until: undefined })
        break
      case EndTypes.UNTIL:
        onChange({
          count: undefined,
          until: options.dtstart || new Date(),
        })
        break
    }
  }

  return (
    <FormRow label={t('RRuleEditor.end')}>
      <HStack>
        <Select
          value={
            options.count
              ? EndTypes.COUNT
              : options.until
              ? EndTypes.UNTIL
              : EndTypes.NEVER
          }
          onChange={toggleEnd}
        >
          <option value={EndTypes.NEVER}>{t('RRuleEditor.never')}</option>
          <option value={EndTypes.COUNT}>{t('RRuleEditor.count')}</option>
          <option value={EndTypes.UNTIL}>{t('RRuleEditor.until')}</option>
        </Select>

        {options.count && (
          <InputGroup>
            <NumberInput
              max={1000}
              min={1}
              w="80px"
              value={options.count ?? undefined}
              onChange={(count) => onChange({ count })}
            />
            <InputRightAddon>{t('RRuleEditor.count-suffix')}</InputRightAddon>
          </InputGroup>
        )}

        {options.until && (
          <Input
            type="datetime-local"
            value={options.until ? getDateTimeLocal(options.until) : undefined}
            w="150%"
            onChange={(e) => onChange({ until: new Date(e.target.value) })}
          />
        )}
      </HStack>
    </FormRow>
  )
}
