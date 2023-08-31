import IconTextButton from '@atoms/IconTextButton'
import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import {
  ThreadActivityFragment,
  ThreadsWithMeetingNoteSubscription,
  useUpdateThreadActivityMutation,
} from '@gql'
import { Draggable } from '@hello-pangea/dnd'
import useCreateThreadMeetingNote from '@hooks/useCreateThreadMeetingNote'
import { EditorHandle } from '@molecules/editor'
import CollabEditor from '@molecules/editor/CollabEditor'
import { ThreadActivityDataMeetingNote } from '@shared/model/thread_activity'
import React, { useCallback, useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import ThreadItem from '../thread/ThreadItem'

export type CircleThreadWithMeetingNote = NonNullable<
  ThreadsWithMeetingNoteSubscription['thread']
>[0]

interface Props {
  thread: CircleThreadWithMeetingNote
  index: number
  onRemove?(): void
}

export default function MeetingStepContentThreadItem({
  thread,
  index,
  onRemove,
}: Props) {
  const { t } = useTranslation()
  const editorRef = useRef<EditorHandle>(null)
  const meetingState = useContext(MeetingContext)!
  const { meeting, editable } = meetingState

  const createThreadMeetingNote = useCreateThreadMeetingNote()
  const [updateThreadActivity] = useUpdateThreadActivityMutation()

  // Activity data
  const activity = thread.activities[0] as ThreadActivityFragment | undefined
  const activityData = activity?.data as
    | ThreadActivityDataMeetingNote
    | undefined
  const hasNotes = !!activityData?.notes

  // Update notes
  const handleNotesChange = useCallback(
    (notes: string) => {
      if (!meeting) return
      if (!activity) {
        createThreadMeetingNote(thread.id, meeting.id, notes)
      } else {
        updateThreadActivity({
          variables: {
            id: activity.id,
            values: { data: { notes } },
          },
        })
      }
    },
    [activity, meeting]
  )

  if (!meeting) return null

  return (
    <Draggable draggableId={thread.id} index={index}>
      {(provided, snapshot) => (
        <Box ref={provided.innerRef} {...provided.draggableProps} pb={10}>
          <ThreadItem
            thread={thread}
            showMember
            isDragging={snapshot.isDragging}
            mb={2}
            mx={-2}
            labelProps={{
              fontSize: 'md',
              fontFamily: 'heading',
              fontWeight: 'medium',
            }}
            {...provided.dragHandleProps}
          >
            {onRemove && (
              <IconTextButton
                aria-label={t('common.remove')}
                size="xs"
                variant="ghost"
                icon={<CloseIcon />}
                ml={2}
                zIndex={1}
                onClick={onRemove}
              />
            )}
          </ThreadItem>

          {(editable || hasNotes) && (
            <CollabEditor
              ref={editorRef}
              docId={`thread-${thread.id}-meeting-${meeting.id}`}
              value={activityData?.notes || ''}
              placeholder={t('MeetingStepContent.notesPlaceholder')}
              readOnly={!editable}
              saveEvery={10000}
              onSave={handleNotesChange}
            />
          )}
        </Box>
      )}
    </Draggable>
  )
}
