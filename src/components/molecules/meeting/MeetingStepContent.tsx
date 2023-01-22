import { MeetingContext } from '@contexts/MeetingContext'
import {
  MeetingStepFragment,
  Meeting_Step_Type_Enum,
  useUpdateMeetingStepMutation,
} from '@gql'
import React, { useCallback, useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EditorHandle } from '../editor'
import CollabEditor from '../editor/CollabEditor'
import MeetingStepContentChecklist from './MeetingStepContentChecklist'
import MeetingStepContentIndicators from './MeetingStepContentIndicators'
import MeetingStepContentTasks from './MeetingStepContentTasks'
import MeetingStepContentThreads from './MeetingStepContentThreads'

interface Props {
  step: MeetingStepFragment
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
      {step.type === Meeting_Step_Type_Enum.Threads && (
        <MeetingStepContentThreads step={step as any} />
      )}

      {step.type === Meeting_Step_Type_Enum.Tasks && (
        <MeetingStepContentTasks step={step as any} />
      )}

      {step.type === Meeting_Step_Type_Enum.Checklist && (
        <MeetingStepContentChecklist step={step as any} editorRef={editorRef} />
      )}

      {step.type === Meeting_Step_Type_Enum.Indicators && (
        <MeetingStepContentIndicators
          step={step as any}
          editorRef={editorRef}
        />
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
