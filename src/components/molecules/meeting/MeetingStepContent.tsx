import { Button } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import {
  MeetingStepFragment,
  Meeting_Step_Type_Enum,
  useUpdateMeetingStepMutation,
} from '@gql'
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
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
  const [forceEdit, setForceEdit] = useState(false)
  const [updateMeetingStep] = useUpdateMeetingStepMutation()

  // Disable force edit after having saved some notes
  useEffect(() => {
    if (forceEdit && step.notes) {
      setForceEdit(false)
    }
  }, [forceEdit, step.notes])

  // Disable force edit on blur if editor is empty
  const handleNotesBlur = useCallback(() => {
    if (editorRef.current?.isEmpty()) {
      setForceEdit(false)
    }
  }, [])

  // Update notes
  const handleNotesChange = useCallback(
    (notes: string) => {
      updateMeetingStep({
        variables: {
          id: step.id,
          values: { notes },
        },
      })
    },
    [forceEdit]
  )

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

      {step.notes || forceEdit ? (
        <CollabEditor
          ref={editorRef}
          docId={`meeting-step-${step.id}`}
          value={step.notes}
          placeholder={t('MeetingStepContent.notesPlaceholder')}
          readOnly={!editable}
          autoFocus={forceEdit}
          saveEvery={10000}
          onSave={handleNotesChange}
          onBlur={handleNotesBlur}
        />
      ) : (
        editable && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setForceEdit(true)}
          >
            {t('MeetingStepContent.addNotes')}
          </Button>
        )
      )}
    </>
  )
}
