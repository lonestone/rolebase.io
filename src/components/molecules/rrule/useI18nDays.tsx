import useDateLocale from '@hooks/useDateLocale'
import { addDays, format, startOfWeek } from 'date-fns'
import { useMemo } from 'react'
import { capitalizeFirstLetter, range } from 'src/utils'

export default function useI18nDays() {
  const dateLocale = useDateLocale()

  return useMemo(() => {
    const firstDay = startOfWeek(new Date(), { weekStartsOn: 1 })
    return range(0, 7).map((day) =>
      capitalizeFirstLetter(
        format(addDays(firstDay, day), 'EEEE', { locale: dateLocale })
      )
    )
  }, [])
}
