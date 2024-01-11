import useDateLocale from '@/common/hooks/useDateLocale'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { range } from '@utils/range'
import { format, setMonth } from 'date-fns'
import { useMemo } from 'react'

export default function useI18nMonths() {
  const dateLocale = useDateLocale()

  return useMemo(() => {
    const date = new Date()
    date.setDate(1)
    return range(0, 11).map((month) =>
      capitalizeFirstLetter(
        format(setMonth(date, month), 'MMMM', { locale: dateLocale })
      )
    )
  }, [])
}
