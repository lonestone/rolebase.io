import { meetingStepsEntities } from '@api/entities/meetingSteps'
import { Box } from '@chakra-ui/react'
import { MeetingStepThreads } from '@shared/model/meetingStep'
import { WithId } from '@shared/model/types'
import React, { useCallback } from 'react'
import ThreadsMultiSelect from './ThreadsMultiSelect'

interface Props {
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
}: Props) {
  const { updateMeetingStep } = meetingStepsEntities(meetingId)

  const handleChange = useCallback(
    (threadsIds: string[]) => {
      updateMeetingStep(step.id, { threadsIds })
    },
    [step]
  )

  return (
    <Box mb={5}>
      <ThreadsMultiSelect
        threadsIds={step.threadsIds}
        circleId={circleId}
        onChange={editable ? handleChange : undefined}
      />
    </Box>
  )
}
