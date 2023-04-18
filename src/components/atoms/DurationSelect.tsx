import { Flex, Input, Select } from '@chakra-ui/react'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  value: number | null
  placeholderValue?: number
  size?: 'sm' | 'md' | 'lg'
  onChange(value: number | null): void
}

enum DurationUnits {
  Min = 1,
  Hours = 60,
}

const defaultUnit = DurationUnits.Hours
const pattern = /^\d*$/

function inferUnit(duration: number | null): DurationUnits {
  if (duration === null) return defaultUnit
  if (duration % DurationUnits.Hours == 0) return DurationUnits.Hours
  return DurationUnits.Min
}

function getValueInUnit(value: number | null, unit: DurationUnits) {
  return value === null ? null : Math.round(value / unit)
}

export default function DurationSelect({
  placeholderValue,
  value,
  size,
  onChange,
}: Props) {
  const { t } = useTranslation()

  const [unit, setUnit] = useState(() =>
    inferUnit(value ?? placeholderValue ?? null)
  )

  const handleValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      if (!pattern.test(newValue)) return
      onChange(newValue === '' ? null : parseInt(newValue) * unit)
    },
    [unit]
  )

  const handleUnitChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setUnit((DurationUnits as any)[event.target.value])
    },
    []
  )

  // Round value when unit changes
  useEffect(() => {
    if (value !== null && value % unit !== 0) {
      onChange(Math.round(value / unit) * unit)
    }
  }, [value, unit])

  return (
    <Flex>
      <Input
        placeholder={
          placeholderValue !== undefined
            ? `${getValueInUnit(placeholderValue, unit)} (défaut)`
            : ''
        }
        value={getValueInUnit(value, unit) || ''}
        size={size}
        onChange={handleValueChange}
      />
      <Select
        value={DurationUnits[unit]}
        size={size}
        onChange={handleUnitChange}
      >
        <option value="Min">{t('DurationSelect.min')}</option>
        <option value="Hours">{t('DurationSelect.hours')}</option>
      </Select>
    </Flex>
  )
}
