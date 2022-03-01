import { memberThreadsStatus } from '@api/entities/memberThreadsStatus'
import useCurrentMember from '@hooks/useCurrentMember'
import useSubscription from '@hooks/useSubscription'
import { MemberThreadStatus } from '@shared/member'
import { ThreadEntry } from '@shared/thread'
import { useMemo } from 'react'

export interface ThreadWithStatus extends ThreadEntry {
  read?: boolean
  status?: MemberThreadStatus
}

export default function useThreadsWithStatus(threads?: ThreadEntry[]) {
  const currentMember = useCurrentMember()

  // Threads status for current member
  const subscribe = currentMember
    ? memberThreadsStatus(currentMember.id)?.subscribeThreadStatuses?.()
    : undefined
  const { data: threadsStatus } = useSubscription(subscribe)

  // Filter and sort threads
  return useMemo(() => {
    if (!threads) return
    return (
      threads
        // Enrich with status
        .map((thread): ThreadWithStatus => {
          // Status not loaded yet
          if (!threadsStatus) return thread
          // Find status
          const status = threadsStatus?.find((s) => s.id === thread.id)
          // Not status for this thread = not read
          if (!status) return { ...thread, read: false }
          // Thread is read if last seen activity is last in thread
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
                a.lastActivityDate.nanoseconds - b.lastActivityDate.nanoseconds
              )
            }
            if (a.lastActivityDate) return 1
            if (b.lastActivityDate) return -1
            return 0
          }
          return 0
        })
    )
  }, [threads, threadsStatus])
}