import filterScopedEntitiesByMember from '@shared/helpers/filterScopedEntitiesByMember'
import { EntityWithScope } from '@shared/model/participants'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useFilterScopedEntitiesByMember<
  Entity extends EntityWithScope,
>(data: Entity[] | undefined, memberId?: string): Entity[] | undefined {
  const circles = useStoreState((state) => state.org.circles)

  // Filter entries
  return useMemo(
    () => data && filterScopedEntitiesByMember(data, memberId, circles),
    [data, memberId, circles]
  )
}
