import { subscribeAllMeetings } from '@api/entities/meetings'
import useCurrentMemberCircles from '@hooks/useCurrentMemberCircles'
import useSubscription from '@hooks/useSubscription'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export enum MeetingsFilter {
  MyCircles,
  Others,
  Circle,
  All,
}

export default function useMeetingsList(
  filter: MeetingsFilter,
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
    return filter === MeetingsFilter.MyCircles
      ? // Keep only meetings that are in my circles
        data.filter((meeting) =>
          currentMemberCircles?.some((c) => c.id === meeting.circleId)
        )
      : filter == MeetingsFilter.Others
      ? // Keep only meetings that are not in my circles
        data.filter(
          (meeting) =>
            !currentMemberCircles?.some((c) => c.id === meeting.circleId)
        )
      : filter == MeetingsFilter.Circle
      ? // Keep only meetings that are not in my circles
        data.filter((meeting) => meeting.circleId === circleId)
      : // Keep all meetings
        data
  }, [data, filter, circleId, currentMemberCircles])

  return { meetings, error, loading }
}
