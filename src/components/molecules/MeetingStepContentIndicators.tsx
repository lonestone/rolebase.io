import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Collapse,
} from '@chakra-ui/react'
import CircleButton from '@components/atoms/CircleButton'
import useCircle from '@hooks/useCircle'
import { MeetingStepIndicators } from '@shared/model/meetingStep'
import { WithId } from '@shared/model/types'
import React, { RefObject, useCallback } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { EditorHandle } from './editor/useEditor'

interface Props {
  circleId: string
  step: WithId<MeetingStepIndicators>
  editorRef: RefObject<EditorHandle>
  editable?: Boolean
}

export default function MeetingStepContentIndicators({
  circleId,
  step,
  editorRef,
  editable,
}: Props) {
  const { t } = useTranslation()
  const circle = useCircle(circleId)
  const newValue = circle?.role.indicators

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
          {t('MeetingStepContentIndicators.useCircle', {
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
              i18nKey="MeetingStepContentIndicators.empty"
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
