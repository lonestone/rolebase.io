import ThreadDaySeparator from '@atoms/ThreadDaySeparator'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  StackProps,
  VStack,
} from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { ThreadContext } from '@contexts/ThreadContext'
import { ThreadMemberStatusFragment, Thread_Activity_Type_Enum } from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import ThreadActivity from '@molecules/thread/ThreadActivity'
import {
  ThreadActivityMeetingNoteFragment,
  ThreadActivityChangeStatusFragment,
} from '@shared/model/thread_activity'
import { isSameDay } from 'date-fns'
import React, {
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { FiMessageSquare } from 'react-icons/fi'

interface Props extends StackProps {
  memberStatus?: ThreadMemberStatusFragment
}

export const activityMeetingNoteTmpId = 'tmp'

const ThreadActivities = forwardRef<HTMLDivElement, Props>(
  ({ memberStatus, ...stackProps }, ref) => {
    const { t } = useTranslation()
    const { thread, activities, threadLogs } = useContext(ThreadContext)!
    const meetingState = useContext(MeetingContext)
    const currentMember = useCurrentMember()

    // Temporary meeting note
    const tmpMeetingNoteActivity = useMemo(() => {
      if (
        !thread ||
        !activities ||
        !meetingState?.meeting ||
        activities.some(
          (a) =>
            a.type === Thread_Activity_Type_Enum.MeetingNote &&
            a.refMeeting?.id === meetingState.meeting?.id
        )
      ) {
        return undefined
      }

      // Add temporary meeting note to activities
      return {
        id: activityMeetingNoteTmpId,
        threadId: thread.id,
        userId: '',
        createdAt: new Date().toISOString(),
        type: Thread_Activity_Type_Enum.MeetingNote,
        refMeeting: meetingState.meeting,
        data: {
          notes: '',
        },
      } as ThreadActivityMeetingNoteFragment
    }, [thread, activities, meetingState?.meeting?.id])

    // Thread Logs as activities
    const threadLogsActivity = useMemo(() => {
      if (!thread || !threadLogs) {
        return undefined
      }

      return threadLogs.map((log) => {
        return {
          id: log.id,
          type: Thread_Activity_Type_Enum.ChangeStatus,
          userId: log.userId,
          createdAt: log.createdAt,
          data: {
            ...log,
          },
        } as ThreadActivityChangeStatusFragment
      })
    }, [thread, threadLogs])

    // Concat activities and logs sorted by createdAt asc
    const concatThreadLogsActivities =
      activities &&
      activities.concat(threadLogsActivity || []).sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      })

    // Previous status to show a mark
    const [lastReadActivityId, setLastReadActivityId] = useState<
      string | undefined
    >()

    // Update read mark
    useEffect(() => {
      if (!thread || !activities || !currentMember) {
        return
      }
      const lastActivityId = activities[activities.length - 1]?.id || null
      const lastReadActivityId = memberStatus?.lastReadActivityId

      if (lastReadActivityId && lastReadActivityId !== lastActivityId) {
        setLastReadActivityId(lastReadActivityId)
      }
    }, [
      memberStatus,
      // Member status may be provided after other deps,
      // so we need to check the existence of their values
      !thread,
      !activities,
      !currentMember,
    ])

    return (
      <VStack spacing={0} mb={2} align="stretch" ref={ref} {...stackProps}>
        {activities &&
          activities.map((activity, i) => (
            <React.Fragment key={`activity_${activity.id}`}>
              {(i === 0 ||
                !isSameDay(
                  new Date(activity.createdAt),
                  new Date(concatThreadLogsActivities[i - 1].createdAt)
                )) && <ThreadDaySeparator date={activity.createdAt} />}

              <ThreadActivity activity={activity} />

              {lastReadActivityId === activity.id && (
                <Box h="3px" w="100%" bg="red.200" _dark={{ bg: 'red.800' }} />
              )}
            </React.Fragment>
          ))}

        {concatThreadLogsActivities?.length === 0 &&
          !tmpMeetingNoteActivity && (
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
                {t('ThreadActivities.emptyTitle')}
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                {t('ThreadActivities.emptyDescription')}
              </AlertDescription>
            </Alert>
          )}

        {tmpMeetingNoteActivity && (
          <ThreadActivity activity={tmpMeetingNoteActivity} />
        )}
      </VStack>
    )
  }
)

ThreadActivities.displayName = 'ThreadActivities'

export default ThreadActivities
