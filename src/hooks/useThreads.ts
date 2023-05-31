import {
  ThreadFragment,
  Thread_Status_Enum,
  useThreadsSubscription,
} from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import { useMemo } from 'react'
import { useOrgId } from './useOrgId'

export interface ThreadWithStatus extends ThreadFragment {
  read: boolean
}

export default function useThreads(filters?: {
  circleId?: string
  archived?: boolean
  status?: Thread_Status_Enum
}) {
  const orgId = useOrgId()
  const currentMember = useCurrentMember()

  // Subscribe to threads
  const {
    data: threadsData,
    error,
    loading,
  } = useThreadsSubscription({
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
        {
          status: filters?.status
            ? { _eq: filters?.status }
            : { _neq: Thread_Status_Enum.Closed },
        },

        ...(filters?.circleId
          ? [{ circleId: { _eq: filters?.circleId } }]
          : []),
      ],
    },
  })
  const threads = threadsData?.thread

  // Filter and sort threads
  const sortedThreads = useMemo((): ThreadWithStatus[] | undefined => {
    if (!threads) return
    return (
      threads
        // Enrich with status
        .map((thread) => {
          // Thread is read if last seen activity is last in thread
          const read =
            (thread.member_status[0]?.lastReadActivityId ?? undefined) ===
            thread.lastActivity[0]?.id
          return { ...thread, read }
        })
        .sort((a, b) => {
          // Show unread threads first
          if (a.read !== b.read) {
            return a.read ? 1 : -1
          }
          // Sort by lastActivityDate
          if (a.lastActivity[0] && b.lastActivity[0]) {
            return b.lastActivity[0].createdAt > a.lastActivity[0].createdAt
              ? 1
              : -1
          }
          if (a.lastActivity) return 1
          if (b.lastActivity) return -1
          return 0
        })
    )
  }, [threads])

  return { threads: sortedThreads, loading, error }
}
