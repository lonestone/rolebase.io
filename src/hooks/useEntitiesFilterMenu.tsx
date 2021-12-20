import { EntityFilters } from '@shared/types'
import { useCallback, useMemo, useState } from 'react'

export default function useEntitiesFilterMenu(
  defaultFilter: EntityFilters = EntityFilters.Invited
) {
  // Filters
  const [filter, setFilter] = useState<EntityFilters>(defaultFilter)
  const value = useMemo(
    () =>
      filter === EntityFilters.All
        ? [EntityFilters.Invited, EntityFilters.NotInvited]
        : [filter],
    [filter]
  )
  const handleChange = useCallback((value: string | string[]) => {
    if (value.length === 0) return
    if (value.length === 1) {
      return setFilter(value[0] as EntityFilters)
    }
    setFilter(EntityFilters.All)
  }, [])

  return { filter, value, handleChange }
}
