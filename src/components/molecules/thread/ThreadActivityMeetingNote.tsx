import Markdown from '@atoms/Markdown'
import { Box, Heading } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { useUpdateThreadActivityMutation } from '@gql'
import useCreateThreadMeetingNote from '@hooks/useCreateThreadMeetingNote'
import useSuperAdmin from '@hooks/useSuperAdmin'
import CollabEditor from '@molecules/editor/CollabEditor'
import MeetingItem from '@molecules/meeting/MeetingItem'
import { useUserId } from '@nhost/react'
import { activityMeetingNoteTmpId } from '@organisms/thread/ThreadActivities'
import { ThreadActivityMeetingNoteFragment } from '@shared/model/thread_activity'
import { useCallback, useContext } from 'react'
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

  if (!activity.refMeeting) {
    console.error('No activity.refMeeting')
    return null
  }
  const meeting = activity.refMeeting

  const isEditable =
    meetingState?.editable &&
    meetingState.meeting?.id === activity.refMeeting?.id

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
