import { memberThreadsStatus } from '@api/entities/memberThreadsStatus'
import { subscribeAllThreads } from '@api/entities/threads'
import useCurrentMember from '@hooks/useCurrentMember'
import useCurrentMemberCircles from '@hooks/useCurrentMemberCircles'
import useSubscription from '@hooks/useSubscription'
import { MemberThreadStatus } from '@shared/member'
import { ThreadEntry } from '@shared/thread'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export enum ThreadsFilter {
  MyCircles,
  Others,
  Circle,
  All,
}

export interface ThreadWithStatus extends ThreadEntry {
  read: boolean
  status?: MemberThreadStatus
}

export default function useThreadsList(
  filter: ThreadsFilter,
  archived: boolean,
  circleId?: string
) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const currentMember = useCurrentMember()
  const currentMemberCircles = useCurrentMemberCircles()

  // Subscribe to threads
  const { data, error, loading } = useSubscription(
    orgId ? subscribeAllThreads(orgId, archived) : undefined
  )

  // Threads status for current member
  const subscribe = currentMember
    ? memberThreadsStatus(currentMember.id)?.subscribeThreadStatuses?.()
    : undefined
  const { data: threadsStatus } = useSubscription(subscribe)

  // Filter and sort threads
  const threads = useMemo(() => {
    if (!data) return
    return (
      (
        filter === ThreadsFilter.MyCircles
          ? // Keep only threads that are in my circles
            data.filter((thread) =>
              currentMemberCircles?.some((c) => c.id === thread.circleId)
            )
          : filter == ThreadsFilter.Others
          ? // Keep only threads that are not in my circles
            data.filter(
              (thread) =>
                !currentMemberCircles?.some((c) => c.id === thread.circleId)
            )
          : filter == ThreadsFilter.Circle
          ? // Keep only threads that are not in my circles
            data.filter((thread) => thread.circleId === circleId)
          : // Keep all threads
            data
      )
        // Enrich with status
        .map((thread): ThreadWithStatus => {
          const status = threadsStatus?.find((s) => s.id === thread.id)
          if (!status) return { ...thread, read: false }
          const read =
            status && status.lastReadActivityId === thread.lastActivityId
          return { ...thread, status, read }
        })
        .sort((a, b) => {
          // Show unread threads first
          if (a.read !== b.read) {
            return a.read ? 1 : -1
          }
          // Sort by lastActivityDate
          if (a.status && b.status) {
            if (a.lastActivityDate && b.lastActivityDate) {
              return (
                b.lastActivityDate.nanoseconds - a.lastActivityDate.nanoseconds
              )
            }
            if (a.lastActivityDate) return 1
            if (b.lastActivityDate) return -1
            return 0
          }
          return 0
        })
    )
  }, [data, filter, circleId, currentMemberCircles, threadsStatus])

  return { threads, error, loading }
}
