import { Box, BoxProps, Button, Collapse } from '@chakra-ui/react'
import useCircle from '@hooks/useCircle'
import { MeetingStepChecklist } from '@shared/meetingStep'
import { WithId } from '@shared/types'
import React, { RefObject, useCallback } from 'react'
import { MarkdownEditorHandle } from './editor/chunk/useMarkdownEditor'

interface Props extends BoxProps {
  circleId: string
  step: WithId<MeetingStepChecklist>
  editorRef: RefObject<MarkdownEditorHandle>
  editable?: Boolean
}

export default function MeetingStepContentChecklist({
  circleId,
  step,
  editorRef,
  editable,
  ...boxProps
}: Props) {
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
          Utiliser la checklist du cercle {circle?.role.name}
        </Button>
      </Box>
    </Collapse>
  )
}
