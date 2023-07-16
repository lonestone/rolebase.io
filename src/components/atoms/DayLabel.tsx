import { BoxProps, Text, chakra } from '@chakra-ui/react'
import useDateLocale from '@hooks/useDateLocale'
import { format, isSameDay, isToday, isTomorrow } from 'date-fns'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props extends BoxProps {
  date: string
  prevDate?: string
}

export default function DayLabel({
  date: dateStr,
  prevDate: prevDateStr,
  ...boxProps
}: Props) {
  const { t } = useTranslation()
  const dateLocale = useDateLocale()

  const date = new Date(dateStr)
  const prevDate = prevDateStr ? new Date(prevDateStr) : undefined

  // Show nothing if the date is the same as the previous one
  if (prevDate && isSameDay(date, prevDate)) {
    return null
  }

  return (
    <Text pl={2} fontSize="sm" {...boxProps}>
      <chakra.span fontWeight="bold" textTransform="uppercase" mr={2}>
        {isToday(date)
          ? t('common.dates.today')
          : isTomorrow(date)
          ? t('common.dates.tomorrow')
          : format(date, 'eeee', { locale: dateLocale })}
      </chakra.span>
      {format(date, 'P', { locale: dateLocale })}
    </Text>
  )
}
