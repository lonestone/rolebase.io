import { subscribeActivities } from '@api/entities/activities'
import { memberThreadsStatus } from '@api/entities/memberThreadsStatus'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Divider,
  StackProps,
  VStack,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ThreadDaySeparator from '@components/atoms/ThreadDaySeparator'
import ThreadActivity from '@components/molecules/ThreadActivity'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import useSubscription from '@hooks/useSubscription'
import { MemberThreadStatus } from '@shared/member'
import { isSameDay } from 'date-fns'
import React, { forwardRef, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiMessageSquare } from 'react-icons/fi'
import { ThreadContext } from 'src/contexts/ThreadContext'

const ThreadActivities = forwardRef<HTMLDivElement, StackProps>(
  (stackProps, ref) => {
    const { t } = useTranslation()
    const orgId = useOrgId()
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

    // Previous status to show a mark
    const [markStatus, setMarkStatus] = useState<
      MemberThreadStatus | undefined
    >()

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
        // Show a mark after previously seen activity
        if (threadStatus && !markStatus) {
          setMarkStatus(threadStatus)
        }

        // Save new status
        threadStatusMethods?.createThreadStatus(
          {
            lastReadActivityId: lastActivity.id,
          },
          thread.id
        )
      }
    }, [
      thread,
      activities,
      threadStatus,
      markStatus,
      loeadingThreadStatus,
      currentMember,
    ])

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
              {t('organisms.ThreadActivities.emptyTitle')}
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              {t('organisms.ThreadActivities.emptyDescription')}
            </AlertDescription>
          </Alert>
        )}

        {activities &&
          activities.map((activity, i) => (
            <React.Fragment key={activity.id}>
              {(i === 0 ||
                !isSameDay(
                  activity.createdAt.toDate(),
                  activities[i - 1].createdAt.toDate()
                )) && <ThreadDaySeparator date={activity.createdAt.toDate()} />}

              <ThreadActivity activity={activity} />

              {markStatus?.lastReadActivityId === activity.id && (
                <Divider borderColor="#ffa0a0" borderBottomWidth="3px" />
              )}
            </React.Fragment>
          ))}
      </VStack>
    )
  }
)

ThreadActivities.displayName = 'ThreadActivities'

export default ThreadActivities
