import { HStack, Input, Select } from '@chakra-ui/react'
import {
  getDateFromUTCDate,
  getUTCDateFromDate,
} from '@rolebase/shared/helpers/RRuleUTC'
import { getDateTimeLocal, getTimeZone, listTimeZones } from '@utils/dates'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FormRow } from './FormRow'
import { FormPartProps } from './RRuleEditor'

export default function RRuleStartDate({ options, onChange }: FormPartProps) {
  const { t } = useTranslation()
  const currentTZ = useMemo(() => getTimeZone(), [])
  const timezones = useMemo(() => listTimeZones(), [])
  const showTZ = useMemo(() => options.tzid && options.tzid !== currentTZ, [])

  const startDate = useMemo(
    () =>
      options.dtstart
        ? getDateTimeLocal(getDateFromUTCDate(options.dtstart))
        : '',
    [options.dtstart, options.tzid]
  )

  const handleDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        dtstart: getUTCDateFromDate(new Date(event.target.value)),
      })
    },
    [onChange]
  )

  const handleTZChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange({
        tzid: event.target.value,
      })
    },
    [onChange]
  )

  return (
    <FormRow label={t('RRuleEditor.startDate')}>
      <HStack>
        <Input
          type="datetime-local"
          value={startDate}
          minW="183px"
          onChange={handleDateChange}
        />

        {showTZ && (
          <Select value={options.tzid || undefined} onChange={handleTZChange}>
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </Select>
        )}
      </HStack>
    </FormRow>
  )
}
