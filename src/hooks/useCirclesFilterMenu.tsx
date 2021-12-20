import { CirclesFilters } from '@shared/circle'
import { useCallback, useMemo, useState } from 'react'

export default function useCirclesFilterMenu(
  defaultFilter: CirclesFilters = CirclesFilters.MyCircles
) {
  // Filters
  const [circlesFilter, setCirclesFilter] =
    useState<CirclesFilters>(defaultFilter)
  const value = useMemo(
    () =>
      circlesFilter === CirclesFilters.All
        ? [CirclesFilters.MyCircles, CirclesFilters.Others]
        : [circlesFilter],
    [circlesFilter]
  )
  const handleChange = useCallback((value: string | string[]) => {
    if (value.length === 0) return
    if (value.length === 1) {
      return setCirclesFilter(value[0] as CirclesFilters)
    }
    setCirclesFilter(CirclesFilters.All)
  }, [])

  return { circlesFilter, value, handleChange }
}
