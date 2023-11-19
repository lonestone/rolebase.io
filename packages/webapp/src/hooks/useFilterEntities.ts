import filterEntities from '@shared/helpers/filterEntities'
import {
  EntityFilters,
  EntityWithParticipants,
} from '@shared/model/participants'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'
import useCurrentMember from './useCurrentMember'

export default function useFilterEntities<
  Entity extends EntityWithParticipants,
>(
  filter: EntityFilters,
  data: Entity[] | undefined,
  circleId?: string
): Entity[] | undefined {
  const currentMember = useCurrentMember()
  const circles = useStoreState((state) => state.org.circles)

  // Filter entries
  return useMemo(
    () =>
      data &&
      filterEntities(filter, data, circles, circleId, currentMember?.id),
    [data, filter, circleId, currentMember, circles]
  )
}
