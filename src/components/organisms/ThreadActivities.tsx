import { subscribeActivities } from '@api/entities/activities'
import { memberThreadsStatus } from '@api/entities/memberThreadsStatus'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  StackProps,
  VStack,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ThreadActivity from '@components/molecules/ThreadActivity'
import ThreadDaySeparator from '@components/molecules/ThreadDaySeparator'
import useCurrentMember from '@hooks/useCurrentMember'
import useSubscription from '@hooks/useSubscription'
import { useStoreState } from '@store/hooks'
import React, { forwardRef, useContext, useEffect } from 'react'
import { FiMessageSquare } from 'react-icons/fi'
import { ThreadContext } from 'src/contexts/ThreadContext'

const ThreadActivities = forwardRef<HTMLDivElement, StackProps>(
  (stackProps, ref) => {
    const orgId = useStoreState((state) => state.orgs.currentId)
    const thread = useContext(ThreadContext)
    const currentMember = useCurrentMember()

    // Subscribe to activities
    const {
      data: activities,
      error,
      loading,
    } = useSubscription(
      orgId && thread ? subscribeActivities(orgId, thread.id) : undefined
    )

    // Update read status
    const threadStatusMethods = currentMember
      ? memberThreadsStatus(currentMember?.id)
      : undefined
    const { data: threadStatus, loading: loeadingThreadStatus } =
      useSubscription(
        thread && threadStatusMethods?.subscribeThreadStatus?.(thread.id)
      )
    useEffect(() => {
      if (!thread || !activities || !currentMember || loeadingThreadStatus)
        return
      const lastActivity = activities[activities.length - 1]
      if (
        lastActivity &&
        threadStatus?.lastReadActivityId !== lastActivity.id
      ) {
        // Save new status
        threadStatusMethods?.createThreadStatus(
          {
            lastReadActivityId: lastActivity.id,
          },
          thread.id
        )
      }
    }, [thread, activities, threadStatus, loeadingThreadStatus, currentMember])

    return (
      <VStack spacing={0} mb={2} align="stretch" ref={ref} {...stackProps}>
        {loading && <Loading active center />}
        <TextErrors errors={[error]} />

        {activities?.length === 0 && (
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <FiMessageSquare size={40} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Discussion créée
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Vous pouvez envoyer un premier message 👇
            </AlertDescription>
          </Alert>
        )}

        {activities &&
          activities.map((activity, i) => (
            <React.Fragment key={activity.id}>
              {(i === 0 ||
                activity.createdAt.toDate().getDay() !==
                  activities[i - 1].createdAt.toDate().getDay()) && (
                <ThreadDaySeparator date={activity.createdAt.toDate()} />
              )}
              <ThreadActivity activity={activity} />
            </React.Fragment>
          ))}
      </VStack>
    )
  }
)

export default ThreadActivities
