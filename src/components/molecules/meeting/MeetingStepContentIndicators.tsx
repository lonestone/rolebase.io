import CircleButton from '@atoms/CircleButton'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Collapse,
} from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { MeetingStepIndicators } from '@shared/model/meeting_step'
import { WithId } from '@shared/model/types'
import React, { RefObject, useCallback, useContext } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { EditorHandle } from '../editor'

interface Props {
  step: WithId<MeetingStepIndicators>
  editorRef: RefObject<EditorHandle>
}

export default function MeetingStepContentIndicators({
  step,
  editorRef,
}: Props) {
  const { circle, editable } = useContext(MeetingContext)!
  const { t } = useTranslation()
  const newValue = circle?.role.indicators

  const handleSet = useCallback(() => {
    if (!newValue) return
    editorRef.current?.setValue(JSON.parse(newValue))
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
