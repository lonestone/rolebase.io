import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
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
import {
  Thread_Activity_Type_Enum,
  useCreateThreadMemberStatusMutation,
  useThreadActivitiesSubscription,
  useUpdateThreadMemberStatusMutation,
} from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import ThreadActivity from '@molecules/thread/ThreadActivity'
import { ThreadActivityMeetingNoteFragment } from '@shared/model/thread_activity'
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
  memberStatus?: MemberStatus
}

interface MemberStatus {
  lastReadActivityId?: string | null | undefined
  lastReadDate: string
}

export const activityMeetingNoteTmpId = 'tmp'

const ThreadActivities = forwardRef<HTMLDivElement, Props>(
  ({ memberStatus, ...stackProps }, ref) => {
    const { t } = useTranslation()
    const thread = useContext(ThreadContext)
    const meetingState = useContext(MeetingContext)
    const currentMember = useCurrentMember()
    const [createThreadMemberStatus] = useCreateThreadMemberStatusMutation()
    const [updateThreadMemberStatus] = useUpdateThreadMemberStatusMutation()

    // Subscribe to activities
    const { data, error, loading } = useThreadActivitiesSubscription({
      skip: !thread,
      variables: { threadId: thread?.id! },
    })

    // If there is a current meeting state, assure that we have a MeetingNote activity
    const activities = data?.thread_activity

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

    // Previous status to show a mark
    const [lastReadActivityId, setLastReadActivityId] = useState<
      string | null | undefined
    >()

    // Update read status
    useEffect(() => {
      if (!thread || !activities || !currentMember) {
        return
      }
      const lastActivityId = activities[activities.length - 1]?.id || null

      // Up to date
      if (memberStatus?.lastReadActivityId === lastActivityId) {
        if (lastReadActivityId === undefined) {
          // No mark
          setLastReadActivityId(null)
        }
      }
      // Unread activities
      else {
        // Show a mark after previously seen activity
        if (lastReadActivityId === undefined) {
          setLastReadActivityId(memberStatus?.lastReadActivityId || null)
        }

        // Save new status
        if (memberStatus) {
          updateThreadMemberStatus({
            variables: {
              threadId: thread.id,
              memberId: currentMember.id,
              values: {
                lastReadActivityId: lastActivityId,
                lastReadDate: new Date().toISOString(),
              },
            },
          })
        } else {
          createThreadMemberStatus({
            variables: {
              values: {
                threadId: thread.id,
                memberId: currentMember.id,
                lastReadActivityId: lastActivityId,
                lastReadDate: new Date().toISOString(),
              },
            },
          })
        }
      }
    }, [thread, activities, memberStatus, currentMember])

    return (
      <VStack spacing={0} mb={2} align="stretch" ref={ref} {...stackProps}>
        {loading && <Loading active center />}
        <TextErrors errors={[error]} />

        {activities &&
          activities.map((activity, i) => (
            <React.Fragment key={activity.id}>
              {(i === 0 ||
                !isSameDay(
                  new Date(activity.createdAt),
                  new Date(activities[i - 1].createdAt)
                )) && <ThreadDaySeparator date={activity.createdAt} />}

              <ThreadActivity activity={activity} />

              {lastReadActivityId === activity.id && (
                <Box h="3px" w="100%" bg="red.200" _dark={{ bg: 'red.800' }} />
              )}
            </React.Fragment>
          ))}

        {activities?.length === 0 && !tmpMeetingNoteActivity && (
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
