import useDateLocale from '@/common/hooks/useDateLocale'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { range } from '@utils/range'
import { addDays, format, startOfWeek } from 'date-fns'
import { useMemo } from 'react'

export default function useI18nDays() {
  const dateLocale = useDateLocale()

  return useMemo(() => {
    const firstDay = startOfWeek(new Date(), { weekStartsOn: 1 })
    return range(0, 6).map((day) =>
      capitalizeFirstLetter(
        format(addDays(firstDay, day), 'eeee', { locale: dateLocale })
      )
    )
  }, [])
}
