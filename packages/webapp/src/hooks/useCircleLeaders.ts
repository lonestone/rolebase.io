import { CircleFullFragment } from '@gql'
import { getCircleLeaders } from '@shared/helpers/getCircleLeaders'
import { groupParticipantsByMember } from '@shared/helpers/groupParticipantsByMember'
import { ParticipantMember } from '@shared/model/member'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useCircleLeaders(
  circleOrId?: string | CircleFullFragment
): ParticipantMember[] {
  const circles = useStoreState((state) => state.org.circles)

  return useMemo(() => {
    if (!circles) return []

    // Get circle
    const circle =
      typeof circleOrId === 'string'
        ? circles.find((c) => c.id === circleOrId)
        : circleOrId
    if (!circle) return []

    // Compute leaders and group by member
    return groupParticipantsByMember(
      circleOrId ? getCircleLeaders(circleOrId, circles) : []
    )
  }, [circleOrId, circles])
}
