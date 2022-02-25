import { meetingStepsEntities } from '@api/entities/meetingSteps'
import { MeetingStepTasks } from '@shared/meetingStep'
import { WithId } from '@shared/types'
import React, { useCallback } from 'react'
import TasksMultiSelect from './TasksMultiSelect'

interface Props {
  meetingId: string
  step: WithId<MeetingStepTasks>
  editable?: boolean
  disableSort: boolean
}

export default function MeetingStepContentTasks({
  meetingId,
  step,
  editable,
  disableSort,
}: Props) {
  // Subscribe meeting steps
  const { updateMeetingStep } = meetingStepsEntities(meetingId)

  const handleChange = useCallback(
    (tasksIds: string[]) => {
      updateMeetingStep(step.id, { tasksIds })
    },
    [step]
  )

  return (
    <TasksMultiSelect
      tasksIds={step.tasksIds}
      onChange={editable ? handleChange : undefined}
      disableSort={disableSort}
    />
  )
}
