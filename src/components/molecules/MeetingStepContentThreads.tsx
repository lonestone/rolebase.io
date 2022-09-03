import { meetingStepsEntities } from '@api/entities/meetingSteps'
import { Box } from '@chakra-ui/react'
import { MeetingState } from '@hooks/useMeetingState'
import { MeetingStepThreads } from '@shared/model/meetingStep'
import { WithId } from '@shared/model/types'
import React, { useCallback } from 'react'
import ThreadsMultiSelect from './ThreadsMultiSelect'

interface Props {
  meetingState: MeetingState
  step: WithId<MeetingStepThreads>
}

export default function MeetingStepContentThreads({
  meetingState,
  step,
}: Props) {
  const { meeting, circle, editable } = meetingState
  const { updateMeetingStep } = meetingStepsEntities(meeting?.id || '')

  const handleChange = useCallback(
    (threadsIds: string[]) => {
      updateMeetingStep(step.id, { threadsIds })
    },
    [step]
  )

  if (!circle) return null

  return (
    <Box mb={5}>
      <ThreadsMultiSelect
        threadsIds={step.threadsIds}
        circleId={circle.id}
        onChange={editable ? handleChange : undefined}
      />
    </Box>
  )
}
