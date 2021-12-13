import { memberThreadsStatus } from '@api/entities/memberThreadsStatus'
import { subscribeThreads } from '@api/entities/threads'
import { HStack, LinkBox, LinkOverlay, Spacer, VStack } from '@chakra-ui/react'
import CircleAndParentsButton from '@components/atoms/CircleAndParentsButton'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import useCurrentMember from '@hooks/useCurrentMember'
import useCurrentMemberCircles from '@hooks/useCurrentMemberCircles'
import useSubscription from '@hooks/useSubscription'
import { MemberThreadStatus } from '@shared/member'
import { ThreadEntry } from '@shared/thread'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props {
  myCircles?: boolean
}

interface ThreadWithStatus extends ThreadEntry {
  read: boolean
  status?: MemberThreadStatus
}

export default function ThreadsList({ myCircles }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const currentMember = useCurrentMember()
  const currentMemberCircles = useCurrentMemberCircles()

  // Subscribe to threads
  const { data, error, loading } = useSubscription(
    orgId ? subscribeThreads(orgId) : undefined
  )

  // Threads status for current member
  const subscribeThreadsStatuses = currentMember
    ? memberThreadsStatus(currentMember.id).subscribeThreadStatuses
    : undefined
  const { data: threadsStatus } = useSubscription(subscribeThreadsStatuses?.())

  // Filter and sort threads
  const threads = useMemo(() => {
    if (!data) return
    return (
      (
        myCircles
          ? // Keep only threads that are in my circles
            data.filter((thread) =>
              currentMemberCircles?.some((c) => c.id === thread.circleId)
            )
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
  }, [data, myCircles, currentMemberCircles, threadsStatus])

  return (
    <>
      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      {threads && (
        <VStack spacing={0} align="stretch">
          {threads.map((thread) => (
            <LinkBox
              key={thread.id}
              py={1}
              borderBottomWidth="1px"
              _hover={{ background: '#fafafa' }}
            >
              <HStack>
                <LinkOverlay
                  as={ReachLink}
                  to={`/orgs/${orgId}/threads/${thread.id}`}
                  fontWeight={thread.read ? 'normal' : 'bold'}
                >
                  {thread.title}
                </LinkOverlay>
                <Spacer />
                <CircleAndParentsButton id={thread.circleId} />
              </HStack>
            </LinkBox>
          ))}
        </VStack>
      )}
    </>
  )
}
