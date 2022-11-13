import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Collapse,
} from '@chakra-ui/react'
import CircleButton from '@components/atoms/CircleButton'
import { MeetingState } from '@hooks/useMeetingState'
import { MeetingStepChecklist } from '@shared/model/meeting_step'
import { WithId } from '@shared/model/types'
import React, { RefObject, useCallback } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { EditorHandle } from './editor/useEditor'

interface Props {
  meetingState: MeetingState
  step: WithId<MeetingStepChecklist>
  editorRef: RefObject<EditorHandle>
}

export default function MeetingStepContentChecklist({
  meetingState,
  step,
  editorRef,
}: Props) {
  const { circle, editable } = meetingState
  const { t } = useTranslation()
  const newValue = circle?.role.checklist

  const handleSet = useCallback(() => {
    if (!newValue) return
    editorRef.current?.setValue(newValue)
  }, [editorRef, circle])

  return (
    <>
      <Collapse
        in={editable && newValue && !step.notes ? true : false}
        animateOpacity
      >
        <Button size="sm" mb={5} onClick={handleSet}>
          {t('MeetingStepContentChecklist.useCircle', {
            circle: circle?.role.name,
          })}
        </Button>
      </Collapse>

      <Collapse
        in={editable && !newValue && !step.notes ? true : false}
        animateOpacity
      >
        <Alert status="info" mb={3}>
          <AlertIcon />
          <AlertDescription>
            <Trans
              i18nKey="MeetingStepContentChecklist.empty"
              components={{
                circle: circle ? <CircleButton circle={circle} /> : '…',
              }}
            />
          </AlertDescription>
        </Alert>
      </Collapse>
    </>
  )
}
