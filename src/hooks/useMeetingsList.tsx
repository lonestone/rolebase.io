import { subscribeAllMeetings } from '@api/entities/meetings'
import useCurrentMemberCircles from '@hooks/useCurrentMemberCircles'
import useSubscription from '@hooks/useSubscription'
import { CirclesFilters } from '@shared/circle'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useMeetingsList(
  circlesFilter: CirclesFilters,
  ended: boolean,
  circleId?: string
) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const currentMemberCircles = useCurrentMemberCircles()

  // Subscribe to meetings
  const { data, error, loading } = useSubscription(
    orgId ? subscribeAllMeetings(orgId, ended) : undefined
  )

  // Filter meetings
  const meetings = useMemo(() => {
    if (!data) return
    return circlesFilter === CirclesFilters.MyCircles
      ? // Keep only meetings that are in my circles
        data.filter((meeting) =>
          currentMemberCircles?.some((c) => c.id === meeting.circleId)
        )
      : circlesFilter == CirclesFilters.Others
      ? // Keep only meetings that are not in my circles
        data.filter(
          (meeting) =>
            !currentMemberCircles?.some((c) => c.id === meeting.circleId)
        )
      : circlesFilter == CirclesFilters.Circle
      ? // Keep only meetings that are not in my circles
        data.filter((meeting) => meeting.circleId === circleId)
      : // Keep all meetings
        data
  }, [data, circlesFilter, circleId, currentMemberCircles])

  return { meetings, error, loading }
}
