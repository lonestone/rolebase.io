import { HStack, Radio, RadioGroup, Select, Text } from '@chakra-ui/react'
import { range } from '@utils/range'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FormRow } from './FormRow'
import { FormPartProps } from './RRuleEditor'
import useI18nDays from './useI18nDays'

enum Choices {
  monthday = 'monthday',
  weekday = 'weekday',
}

export default function RRuleMonthly({ options, onChange }: FormPartProps) {
  const { t } = useTranslation()
  const i18nDays = useI18nDays()

  const startDateWeekday = useMemo(
    () => (options.dtstart ? options.dtstart.getDay() - 1 : undefined),
    [options.dtstart]
  )

  const startDateMonthday = useMemo(
    () => (options.dtstart ? options.dtstart.getDate() : undefined),
    [options.dtstart]
  )

  const isMonthday = !!options.bymonthday?.length
  const isWeekday = !!(options.byweekday?.length || options.bysetpos?.length)

  return (
    <FormRow label={t('RRuleEditor.bymonthday')}>
      <RadioGroup
        value={isMonthday ? Choices.monthday : isWeekday ? Choices.weekday : ''}
        onChange={(mode) => {
          if (mode === Choices.monthday) {
            onChange({
              bymonthday: [startDateMonthday ?? 1],
              bysetpos: [],
              byweekday: [],
            })
          } else {
            onChange({
              bymonthday: [],
              bysetpos: [1],
              byweekday: [startDateWeekday ?? 0],
            })
          }
        }}
      >
        <HStack mb={1}>
          <Radio value={Choices.monthday} />
          <Select
            value={options.bymonthday?.toString() || 1}
            w="80px"
            onChange={(e) =>
              onChange({
                bymonthday: [+e.target.value],
                bysetpos: [],
                byweekday: [],
              })
            }
          >
            {range(1, 31).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </Select>
          <Text>{t('RRuleEditor.bymonthday-suffix')}</Text>
        </HStack>

        <HStack>
          <Radio value={Choices.weekday} />

          {startDateWeekday !== undefined ? (
            <>
              <SelectBysetpos options={options} onChange={onChange} />
              <Text>{i18nDays[startDateWeekday]}</Text>
            </>
          ) : (
            <>
              <SelectBysetpos options={options} onChange={onChange} />
              <Select
                value={options.byweekday?.[0] || 0}
                onChange={(e) =>
                  onChange({
                    bymonthday: [],
                    bysetpos: options.bysetpos || [1],
                    byweekday: [+e.target.value],
                  })
                }
              >
                {i18nDays.map((day, index) => (
                  <option key={index} value={index}>
                    {day}
                  </option>
                ))}
              </Select>
            </>
          )}
        </HStack>
      </RadioGroup>
    </FormRow>
  )
}

function SelectBysetpos({ options, onChange }: FormPartProps) {
  const { t } = useTranslation()
  return (
    <Select
      value={options.bysetpos?.[0] || 1}
      onChange={(e) =>
        onChange({
          bymonthday: [],
          bysetpos: [+e.target.value],
          byweekday: options.byweekday || [0],
        })
      }
    >
      {[1, 2, 3, 4, -1].map((pos) => (
        <option key={pos} value={pos}>
          {t(`RRuleEditor.bysetpos.${pos}` as any)}
        </option>
      ))}
    </Select>
  )
}
