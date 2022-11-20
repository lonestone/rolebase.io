import useDateLocale from '@hooks/useDateLocale'
import { format, setMonth } from 'date-fns'
import { useMemo } from 'react'
import { capitalizeFirstLetter, range } from 'src/utils'

export default function useI18nMonths() {
  const dateLocale = useDateLocale()

  return useMemo(() => {
    const date = new Date()
    date.setDate(1)
    return range(0, 12).map((month) =>
      capitalizeFirstLetter(
        format(setMonth(date, month), 'MMMM', { locale: dateLocale })
      )
    )
  }, [])
}