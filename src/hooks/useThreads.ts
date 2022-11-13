import useCurrentMember from '@hooks/useCurrentMember'
import { ThreadEntry } from '@shared/model/thread'
import { useMemo } from 'react'
import { useSubscribeThreadsSubscription } from 'src/graphql.generated'
import { useOrgId } from './useOrgId'

export interface ThreadWithStatus extends ThreadEntry {
  read: boolean
}

export default function useThreads(filters?: {
  circleId?: string
  archived?: boolean
}) {
  const orgId = useOrgId()
  const currentMember = useCurrentMember()

  // Subscribe to threads
  const {
    data: threadsData,
    error,
    loading,
  } = useSubscribeThreadsSubscription({
    skip: !orgId || !currentMember,
    variables: {
      memberId: currentMember?.id!,
      filters: [
        { orgId: { _eq: orgId! } },
        {
          archived: {
            _eq: filters?.archived === undefined ? false : filters.archived,
          },
        },
        ...(filters?.circleId
          ? [{ circleId: { _eq: filters?.circleId } }]
          : []),
      ],
    },
  })
  const threads = threadsData?.thread

  // Filter and sort threads
  const sortedThreads = useMemo(() => {
    if (!threads) return
    return (
      threads
        // Enrich with status
        .map((thread): ThreadWithStatus => {
          // Thread is read if last seen activity is last in thread
          const read =
            thread.member_status[0]?.lastReadActivityId ===
            thread.lastActivityId
          return { ...(thread as ThreadEntry), read }
        })
        .sort((a, b) => {
          // Show unread threads first
          if (a.read !== b.read) {
            return a.read ? 1 : -1
          }
          // Sort by lastActivityDate
          if (a.lastActivityDate && b.lastActivityDate) {
            return b.lastActivityDate > a.lastActivityDate ? 1 : -1
          }
          if (a.lastActivityDate) return 1
          if (b.lastActivityDate) return -1
          return 0
        })
    )
  }, [threads])

  return { threads: sortedThreads, loading, error }
}
