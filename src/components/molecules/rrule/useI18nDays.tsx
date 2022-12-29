import useDateLocale from '@hooks/useDateLocale'
import { addDays, format, startOfWeek } from 'date-fns'
import { useMemo } from 'react'
import { capitalizeFirstLetter } from 'src/utils/capitalizeFirstLetter'
import { range } from 'src/utils/range'

export default function useI18nDays() {
  const dateLocale = useDateLocale()

  return useMemo(() => {
    const firstDay = startOfWeek(new Date(), { weekStartsOn: 1 })
    return range(0, 6).map((day) =>
      capitalizeFirstLetter(
        format(addDays(firstDay, day), 'EEEE', { locale: dateLocale })
      )
    )
  }, [])
}
