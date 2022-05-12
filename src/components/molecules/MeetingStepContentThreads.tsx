import { meetingStepsEntities } from '@api/entities/meetingSteps'
import { Box, BoxProps } from '@chakra-ui/react'
import { MeetingStepThreads } from '@shared/model/meetingStep'
import { WithId } from '@shared/model/types'
import React, { useCallback } from 'react'
import ThreadsMultiSelect from './ThreadsMultiSelect'

interface Props extends BoxProps {
  meetingId: string
  circleId: string
  step: WithId<MeetingStepThreads>
  editable?: Boolean
}

export default function MeetingStepContentThreads({
  meetingId,
  circleId,
  step,
  editable,
  ...boxProps
}: Props) {
  const { updateMeetingStep } = meetingStepsEntities(meetingId)

  const handleChange = useCallback(
    (threadsIds: string[]) => {
      updateMeetingStep(step.id, { threadsIds })
    },
    [step]
  )

  return (
    <Box {...boxProps}>
      <ThreadsMultiSelect
        threadsIds={step.threadsIds}
        circleId={circleId}
        onChange={editable ? handleChange : undefined}
      />
    </Box>
  )
}
