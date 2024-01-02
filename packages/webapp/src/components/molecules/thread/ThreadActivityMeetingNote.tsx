import Markdown from '@atoms/Markdown'
import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { useUpdateThreadActivityMutation } from '@gql'
import useCreateThreadMeetingNote from '@hooks/useCreateThreadMeetingNote'
import CollabEditor from '@molecules/editor/CollabEditor'
import MeetingItem from '@molecules/meeting/MeetingItem'
import { useUserId } from '@nhost/react'
import { activityMeetingNoteTmpId } from '@organisms/thread/ThreadActivities'
import { ThreadActivityMeetingNoteFragment } from '@shared/model/thread_activity'
import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import ThreadActivityAnchor from './ThreadActivityAnchor'

interface Props {
  activity: ThreadActivityMeetingNoteFragment
}

export default function ThreadActivityMeetingNote({ activity }: Props) {
  const { t } = useTranslation()
  const userId = useUserId()

  // Meeting state, defined if thread has been opened from a meeting
  const meetingState = useContext(MeetingContext)
  const meeting = activity.refMeeting

  const createThreadMeetingNote = useCreateThreadMeetingNote()
  const [updateThreadActivity] = useUpdateThreadActivityMutation()

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
    [activity, meeting, userId]
  )

  if (!isEditable && !activity.data.notes) {
    return <ThreadActivityAnchor activityId={activity.id} />
  }

  return (
    <Card m={5} bg="gray.50" _dark={{ bg: 'gray.800' }}>
      <ThreadActivityAnchor activityId={activity.id} />

      <CardHeader>
        <Heading as="h3" fontSize="md">
          {t(`ThreadActivityMeetingNote.title`)}
        </Heading>
      </CardHeader>
      <CardBody pt={0}>
        {meeting ? (
          <>
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
        ) : (
          <Text fontStyle="italic">{t('MeetingStepContent.notAllowed')}</Text>
        )}
      </CardBody>
    </Card>
  )
}
