import { CircleFullFragment } from '@gql'
import { getCircleLeaders } from '@rolebase/shared/helpers/getCircleLeaders'
import { groupParticipantsByMember } from '@rolebase/shared/helpers/groupParticipantsByMember'
import { ParticipantMember } from '@rolebase/shared/model/member'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useCircleLeaders(
  circleOrId?: string | CircleFullFragment
): ParticipantMember[] {
  const circles = useStoreState((state) => state.org.circles)

  return useMemo(() => {
    if (!circleOrId || !circles) return []

    // Compute leaders and group by member
    return groupParticipantsByMember(getCircleLeaders(circleOrId, circles))
  }, [circleOrId, circles])
}
