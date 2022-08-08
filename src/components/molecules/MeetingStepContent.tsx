import { meetingStepsEntities } from '@api/entities/meetingSteps'
import MeetingStepContentTasks from '@components/molecules/MeetingStepContentTasks'
import MeetingStepContentThreads from '@components/molecules/MeetingStepContentThreads'
import { MeetingStepEntry, MeetingStepTypes } from '@shared/model/meetingStep'
import { Bytes } from 'firebase/firestore'
import React, { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import CollabEditor from './editor/CollabEditor'
import { EditorHandle } from './editor/useEditor'
import MeetingStepContentChecklist from './MeetingStepContentChecklist'
import MeetingStepContentIndicators from './MeetingStepContentIndicators'

interface Props {
  meetingId: string
  circleId: string
  started: boolean
  editable: boolean
  step: MeetingStepEntry
}

export default function MeetingStepContent({
  meetingId,
  circleId,
  started,
  editable,
  step,
}: Props) {
  const { t } = useTranslation()
  const { updateMeetingStep } = meetingStepsEntities(meetingId)
  const editorRef = useRef<EditorHandle>(null)

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
        <MeetingStepContentThreads
          meetingId={meetingId}
          step={step}
          circleId={circleId}
          editable={editable}
        />
      )}

      {step.type === MeetingStepTypes.Tasks && (
        <MeetingStepContentTasks
          meetingId={meetingId}
          step={step}
          circleId={circleId}
          started={started}
        />
      )}

      {step.type === MeetingStepTypes.Checklist && (
        <MeetingStepContentChecklist
          circleId={circleId}
          step={step}
          editable={editable}
          editorRef={editorRef}
        />
      )}

      {step.type === MeetingStepTypes.Indicators && (
        <MeetingStepContentIndicators
          circleId={circleId}
          step={step}
          editable={editable}
          editorRef={editorRef}
        />
      )}

      <CollabEditor
        ref={editorRef}
        docId={`meeting${meetingId}-step${step.id}`}
        value={step.notes}
        updates={step.notesUpdates}
        placeholder={t('MeetingStepContent.notesPlaceholder')}
        readOnly={!editable}
        saveDelay={4000}
        onSave={handleNotesChange}
      />
    </>
  )
}
