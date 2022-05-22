import { meetingStepsEntities } from '@api/entities/meetingSteps'
import MeetingStepContentTasks from '@components/molecules/MeetingStepContentTasks'
import MeetingStepContentThreads from '@components/molecules/MeetingStepContentThreads'
import { MeetingStepConfig } from '@shared/model/meeting'
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
  current: boolean
  editable: boolean
  stepConfig: MeetingStepConfig
  step: MeetingStepEntry
}

export default function MeetingStepContent({
  meetingId,
  circleId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  current,
  editable,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stepConfig,
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

  // Common steps props
  const stepProps = {
    meetingId,
    circleId,
    editable,
    mb: 5,
  }

  return (
    <>
      {step.type === MeetingStepTypes.Threads && (
        <MeetingStepContentThreads step={step} {...stepProps} />
      )}

      {step.type === MeetingStepTypes.Tasks && (
        <MeetingStepContentTasks step={step} {...stepProps} />
      )}

      {step.type === MeetingStepTypes.Checklist && (
        <MeetingStepContentChecklist
          step={step}
          {...stepProps}
          editorRef={editorRef}
        />
      )}

      {step.type === MeetingStepTypes.Indicators && (
        <MeetingStepContentIndicators
          step={step}
          {...stepProps}
          editorRef={editorRef}
        />
      )}

      <CollabEditor
        ref={editorRef}
        docId={`meeting${meetingId}-step${step.id}`}
        value={step.notes}
        updates={step.notesUpdates}
        placeholder={t('molecules.MeetingStepContent.notesPlaceholder')}
        readOnly={!editable}
        saveDelay={4000}
        onSave={handleNotesChange}
      />
    </>
  )
}
