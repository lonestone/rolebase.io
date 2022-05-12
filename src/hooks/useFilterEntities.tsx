import useCurrentMemberCircles from '@hooks/useCurrentMemberCircles'
import { EntityFilters, EntityWithParticipants } from '@shared/model/types'
import { useMemo } from 'react'
import useCurrentMember from './useCurrentMember'

export default function useFilterEntities<
  Entity extends EntityWithParticipants
>(
  filter: EntityFilters,
  data?: Entity[],
  circleId?: string
): Entity[] | undefined {
  const currentMember = useCurrentMember()
  const currentMemberCircles = useCurrentMemberCircles()

  // Filter entries
  return useMemo(() => {
    if (!data) return

    // Select all
    if (filter === EntityFilters.All) {
      return data
    }

    // Specific circle
    if (filter === EntityFilters.Circle) {
      return data.filter((entry) => entry.circleId === circleId)
    }

    // Invited or not
    return data.filter((entry) => {
      const invited =
        (currentMember &&
          entry.participantsMembersIds.includes(currentMember.id)) ||
        currentMemberCircles?.some((c) => c.id === entry.circleId)
      return filter === EntityFilters.Invited ? invited : !invited
    })
  }, [data, filter, circleId, currentMemberCircles])
}
