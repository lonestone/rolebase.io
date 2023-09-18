import useCurrentMemberCircles from '@hooks/useCurrentMemberCircles'
import filterEntities from '@shared/helpers/filterEntities'
import {
  EntityFilters,
  EntityWithParticipants,
} from '@shared/model/participants'
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
  const currentMemberCircles = useCurrentMemberCircles()

  // Filter entries
  return useMemo(
    () =>
      data &&
      filterEntities(
        filter,
        data,
        circleId,
        currentMember?.id,
        currentMemberCircles?.map((c) => c.id)
      ),
    [data, filter, circleId, currentMember, currentMemberCircles]
  )
}
