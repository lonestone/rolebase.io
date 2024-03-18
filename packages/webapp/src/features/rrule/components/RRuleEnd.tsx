import NumberInput from '@/common/atoms/NumberInput'
import {
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
} from '@chakra-ui/react'
import { getDateTimeLocal } from '@utils/dates'
import { utcToZonedTime } from 'date-fns-tz'
import React, { ChangeEventHandler, useCallback, useMemo } from 'react'
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

  const toggleEnd: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
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
          until:
            options.until || utcToZonedTime(new Date(), options.tzid || 'UTC'),
        })
        break
    }
  }, [])

  const untilValue = useMemo(
    () => (options.until ? getDateTimeLocal(options.until) : ''),
    [options.until, options.tzid]
  )

  const handleUntilChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        until: utcToZonedTime(
          new Date(event.target.value),
          options.tzid || 'UTC'
        ),
      })
    },
    []
  )

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
              value={options.count}
              onChange={(count) => onChange({ count })}
            />
            <InputRightAddon>{t('RRuleEditor.count-suffix')}</InputRightAddon>
          </InputGroup>
        )}

        {untilValue && (
          <Input
            type="datetime-local"
            value={untilValue}
            w="150%"
            onChange={handleUntilChange}
          />
        )}
      </HStack>
    </FormRow>
  )
}
