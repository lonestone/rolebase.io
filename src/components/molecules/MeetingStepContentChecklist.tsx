import { Box, BoxProps, Button, Collapse } from '@chakra-ui/react'
import useCircle from '@hooks/useCircle'
import { MeetingStepChecklist } from '@shared/model/meetingStep'
import { WithId } from '@shared/model/types'
import React, { RefObject, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { EditorHandle } from './editor/useEditor'

interface Props extends BoxProps {
  circleId: string
  step: WithId<MeetingStepChecklist>
  editorRef: RefObject<EditorHandle>
  editable?: Boolean
}

export default function MeetingStepContentChecklist({
  circleId,
  step,
  editorRef,
  editable,
  ...boxProps
}: Props) {
  const { t } = useTranslation()
  const circle = useCircle(circleId)
  const newValue = circle?.role.checklist

  const handleSet = useCallback(() => {
    if (!newValue) return
    editorRef.current?.setValue(newValue)
  }, [editorRef, circle])

  return (
    <Collapse
      in={circle && newValue && editable && !step.notes ? true : false}
      animateOpacity
    >
      <Box {...boxProps}>
        <Button size="sm" onClick={handleSet}>
          {t('molecules.MeetingStepContentChecklist.useCircle', {
            circle: circle?.role.name,
          })}
        </Button>
      </Box>
    </Collapse>
  )
}