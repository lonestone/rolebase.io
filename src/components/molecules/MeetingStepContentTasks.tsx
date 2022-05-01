import { meetingStepsEntities } from '@api/entities/meetingSteps'
import { Box, BoxProps } from '@chakra-ui/react'
import { MeetingStepTasks } from '@shared/meetingStep'
import { WithId } from '@shared/types'
import React, { useCallback } from 'react'
import TasksMultiSelect from './TasksMultiSelect'

interface Props extends BoxProps {
  meetingId: string
  circleId: string
  step: WithId<MeetingStepTasks>
  editable?: boolean
}

export default function MeetingStepContentTasks({
  meetingId,
  circleId,
  step,
  editable,
  ...boxProps
}: Props) {
  const { updateMeetingStep } = meetingStepsEntities(meetingId)

  const handleChange = useCallback(
    (tasksIds: string[]) => {
      updateMeetingStep(step.id, { tasksIds })
    },
    [step]
  )

  return (
    <Box {...boxProps}>
      <TasksMultiSelect
        tasksIds={step.tasksIds}
        circleId={circleId}
        onChange={editable ? handleChange : undefined}
      />
    </Box>
  )
}
