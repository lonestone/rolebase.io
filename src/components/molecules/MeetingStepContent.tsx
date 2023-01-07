import MeetingStepContentTasks from '@components/molecules/MeetingStepContentTasks'
import MeetingStepContentThreads from '@components/molecules/MeetingStepContentThreads'
import { MeetingStepEntry, MeetingStepTypes } from '@shared/model/meeting_step'
import React, { useCallback, useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { MeetingContext } from 'src/contexts/MeetingContext'
import { useUpdateMeetingStepMutation } from 'src/graphql.generated'
import { EditorHandle } from './editor'
import CollabEditor from './editor/CollabEditor'
import MeetingStepContentChecklist from './MeetingStepContentChecklist'
import MeetingStepContentIndicators from './MeetingStepContentIndicators'

interface Props {
  step: MeetingStepEntry
}

export default function MeetingStepContent({ step }: Props) {
  const { meeting, editable } = useContext(MeetingContext)!
  const { t } = useTranslation()
  const editorRef = useRef<EditorHandle>(null)
  const [updateMeetingStep] = useUpdateMeetingStepMutation()

  // Update notes
  const handleNotesChange = useCallback((notes: string) => {
    updateMeetingStep({
      variables: {
        id: step.id,
        values: { notes },
      },
    })
  }, [])

  if (!meeting) return null

  return (
    <>
      {step.type === MeetingStepTypes.Threads && (
        <MeetingStepContentThreads step={step} />
      )}

      {step.type === MeetingStepTypes.Tasks && (
        <MeetingStepContentTasks step={step} />
      )}

      {step.type === MeetingStepTypes.Checklist && (
        <MeetingStepContentChecklist step={step} editorRef={editorRef} />
      )}

      {step.type === MeetingStepTypes.Indicators && (
        <MeetingStepContentIndicators step={step} editorRef={editorRef} />
      )}

      <CollabEditor
        ref={editorRef}
        docId={`meeting-step-${step.id}`}
        value={step.notes}
        placeholder={t('MeetingStepContent.notesPlaceholder')}
        readOnly={!editable}
        saveDelay={4000}
        onSave={handleNotesChange}
      />
    </>
  )
}
