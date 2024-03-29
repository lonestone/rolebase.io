import { CircleFullFragment } from '@gql'
import { getAllCircleMembersParticipants } from '@rolebase/shared/helpers/getAllCircleMembersParticipants'
import { getCircleParticipants } from '@rolebase/shared/helpers/getCircleParticipants'
import { groupParticipantsByMember } from '@rolebase/shared/helpers/groupParticipantsByMember'
import { ParticipantMember } from '@rolebase/shared/model/member'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useCircleParticipants(
  circleOrId?: string | CircleFullFragment,
  includeChildren = false
): ParticipantMember[] {
  const circles = useStoreState((state) => state.org.circles)

  return useMemo(() => {
    if (!circles || !circleOrId) return []

    // Compute participants and group by member
    return groupParticipantsByMember(
      includeChildren
        ? getAllCircleMembersParticipants(circleOrId, circles)
        : getCircleParticipants(circleOrId, circles)
    )
  }, [circleOrId, circles, includeChildren])
}
