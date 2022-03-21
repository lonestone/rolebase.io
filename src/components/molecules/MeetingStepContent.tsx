import { meetingStepsEntities } from '@api/entities/meetingSteps'
import { Box } from '@chakra-ui/react'
import MeetingStepContentTasks from '@components/molecules/MeetingStepContentTasks'
import MeetingStepContentThreads from '@components/molecules/MeetingStepContentThreads'
import { MeetingStepConfig } from '@shared/meeting'
import { MeetingStepEntry, MeetingStepTypes } from '@shared/meetingStep'
import { Bytes } from 'firebase/firestore'
import React, { useCallback } from 'react'
import MarkdownCollabEditor from './editor/MarkdownCollabEditor'

interface Props {
  meetingId: string
  current: boolean
  editable: boolean
  stepConfig: MeetingStepConfig
  step: MeetingStepEntry
}

export default function MeetingStepContent({
  meetingId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  current,
  editable,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stepConfig,
  step,
}: Props) {
  const { updateMeetingStep } = meetingStepsEntities(meetingId)

  // Update notes
  const handleNotesChange = useCallback(
    (value: string, updates: Uint8Array) => {
      updateMeetingStep(step.id, {
        notes: value,
        notesUpdates: Bytes.fromUint8Array(updates),
      })
    },
    []
  )

  return (
    <>
      {step.type === MeetingStepTypes.Threads && (
        <Box mb={5}>
          <MeetingStepContentThreads
            meetingId={meetingId}
            step={step}
            editable={editable}
          />
        </Box>
      )}

      {step.type === MeetingStepTypes.Tasks && (
        <Box mb={5}>
          <MeetingStepContentTasks
            meetingId={meetingId}
            step={step}
            editable={editable}
          />
        </Box>
      )}

      <MarkdownCollabEditor
        docId={`meeting${meetingId}-step${step.id}`}
        value={step.notes}
        updates={step.notesUpdates}
        placeholder="Notes..."
        readOnly={!editable}
        saveDelay={4000}
        onSave={handleNotesChange}
      />
    </>
  )
}
