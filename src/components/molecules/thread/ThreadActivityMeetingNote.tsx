import Loading from '@atoms/Loading'
import Markdown from '@atoms/Markdown'
import TextErrors from '@atoms/TextErrors'
import { Box, Heading } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import {
  useMeetingSummarySubscription,
  useUpdateThreadActivityMutation,
} from '@gql'
import useCreateThreadMeetingNote from '@hooks/useCreateThreadMeetingNote'
import useSuperAdmin from '@hooks/useSuperAdmin'
import CollabEditor from '@molecules/editor/CollabEditor'
import MeetingItem from '@molecules/meeting/MeetingItem'
import { useUserId } from '@nhost/react'
import { activityMeetingNoteTmpId } from '@organisms/thread/ThreadActivities'
import { ThreadActivityMeetingNoteFragment } from '@shared/model/thread_activity'
import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  activity: ThreadActivityMeetingNoteFragment
}

export default function ThreadActivityMeetingNote({ activity }: Props) {
  const { t } = useTranslation()
  const userId = useUserId()
  const isSuperAdmin = useSuperAdmin()

  // Meeting state, defined if thread has been opened from a meeting
  const meetingState = useContext(MeetingContext)

  const createThreadMeetingNote = useCreateThreadMeetingNote()
  const [updateThreadActivity] = useUpdateThreadActivityMutation()

  const isEditable =
    !!meetingState &&
    meetingState.meeting?.id === activity.refMeeting?.id &&
    meetingState.editable

  // Load meeting if there is not meetingState
  const { data, loading, error } = useMeetingSummarySubscription({
    skip: isEditable || !activity.refMeeting,
    variables: { id: activity.refMeeting?.id! },
  })
  const meeting = data?.meeting_by_pk || meetingState?.meeting

  // Update notes
  const handleNotesChange = useCallback(
    async (notes: string) => {
      if (!meeting) return
      if (activity.id === activityMeetingNoteTmpId) {
        createThreadMeetingNote(activity.threadId, meeting.id, notes)
      } else {
        updateThreadActivity({
          variables: {
            id: activity.id,
            values: { data: { notes } },
          },
        })
      }
    },
    [activity, meeting, isSuperAdmin, userId]
  )

  if (!isEditable && !activity.data.notes) return null

  return (
    <Box p={5}>
      <Box
        border="2px solid"
        borderRadius="md"
        borderColor="gray.100"
        bg="gray.50"
        _dark={{
          borderColor: 'gray.550',
          bg: 'whiteAlpha.50',
        }}
        p={5}
      >
        {loading && <Loading active size="md" />}
        <TextErrors errors={[error]} />

        {meeting && (
          <>
            <Heading as="h3" fontSize="md" mb={2}>
              {t(`ThreadActivityMeetingNote.title`, { title: meeting.title })}
            </Heading>
            <MeetingItem meeting={meeting} showDate showIcon mb={2} mx={-2} />

            {isEditable ? (
              <CollabEditor
                docId={`thread-${activity.threadId}-meeting-${meeting.id}`}
                value={activity.data.notes}
                placeholder={t('MeetingStepContent.notesPlaceholder')}
                minH="80px"
                saveEvery={10000}
                onSave={handleNotesChange}
              />
            ) : (
              <Markdown>{activity.data.notes}</Markdown>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}
