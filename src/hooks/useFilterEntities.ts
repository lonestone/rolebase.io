import useCurrentMemberCircles from '@hooks/useCurrentMemberCircles'
import filterEntities from '@shared/helpers/filterEntities'
import { MeetingAttendee } from '@shared/model/meeting'
import { EntityFilters, EntityWithParticipants } from '@shared/model/types'
import { useMemo } from 'react'
import useCurrentMember from './useCurrentMember'

export default function useFilterEntities<
  Entity extends EntityWithParticipants & {
    attendees?: MeetingAttendee[] | null
  }
>(
  filter: EntityFilters,
  data?: Entity[],
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
