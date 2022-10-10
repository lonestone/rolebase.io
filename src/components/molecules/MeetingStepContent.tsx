import { byteaToUint8Array, uint8ArrayToBytea } from '@api/bytea'
import MeetingStepContentTasks from '@components/molecules/MeetingStepContentTasks'
import MeetingStepContentThreads from '@components/molecules/MeetingStepContentThreads'
import { MeetingState } from '@hooks/useMeetingState'
import { MeetingStepEntry, MeetingStepTypes } from '@shared/model/meeting_step'
import React, { useCallback, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useUpdateMeetingStepMutation } from 'src/graphql.generated'
import CollabEditor from './editor/CollabEditor'
import { EditorHandle } from './editor/useEditor'
import MeetingStepContentChecklist from './MeetingStepContentChecklist'
import MeetingStepContentIndicators from './MeetingStepContentIndicators'

interface Props {
  meetingState: MeetingState
  step: MeetingStepEntry
}

export default function MeetingStepContent({ meetingState, step }: Props) {
  const { meeting, editable } = meetingState
  const { t } = useTranslation()
  const editorRef = useRef<EditorHandle>(null)
  const [updateMeetingStep] = useUpdateMeetingStepMutation()

  const updates = useMemo(
    () =>
      step.notesUpdates ? byteaToUint8Array(step.notesUpdates) : undefined,
    []
  )

  // Update notes
  const handleNotesChange = useCallback(
    (value: string, updates: Uint8Array) => {
      updateMeetingStep({
        variables: {
          id: step.id,
          values: {
            notes: value,
            notesUpdates: uint8ArrayToBytea(updates),
          },
        },
      })
    },
    []
  )

  if (!meeting) return null

  return (
    <>
      {step.type === MeetingStepTypes.Threads && (
        <MeetingStepContentThreads meetingState={meetingState} step={step} />
      )}

      {step.type === MeetingStepTypes.Tasks && (
        <MeetingStepContentTasks meetingState={meetingState} step={step} />
      )}

      {step.type === MeetingStepTypes.Checklist && (
        <MeetingStepContentChecklist
          meetingState={meetingState}
          step={step}
          editorRef={editorRef}
        />
      )}

      {step.type === MeetingStepTypes.Indicators && (
        <MeetingStepContentIndicators
          meetingState={meetingState}
          step={step}
          editorRef={editorRef}
        />
      )}

      <CollabEditor
        ref={editorRef}
        docId={`meeting${meeting.id}-step${step.id}`}
        value={step.notes}
        updates={updates}
        placeholder={t('MeetingStepContent.notesPlaceholder')}
        readOnly={!editable}
        saveDelay={4000}
        onSave={handleNotesChange}
      />
    </>
  )
}
