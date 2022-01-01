import { meetingStepsEntities } from '@api/entities/meetingSteps'
import { MeetingStepThreads } from '@shared/meetingStep'
import { WithId } from '@shared/types'
import React, { useCallback } from 'react'
import ThreadsMultiSelect from './ThreadsMultiSelect'

interface Props {
  meetingId: string
  step: WithId<MeetingStepThreads>
  editable?: boolean
}

export default function MeetingStepContentThreads({
  meetingId,
  step,
  editable,
}: Props) {
  // Subscribe meeting steps
  const { updateMeetingStep } = meetingStepsEntities(meetingId)

  const handleAdd = useCallback(
    (threadId: string) => {
      updateMeetingStep(step.id, {
        threadsIds: [...step.threadsIds, threadId],
      })
    },
    [step]
  )

  const handleRemove = useCallback(
    (threadId: string) => {
      updateMeetingStep(step.id, {
        threadsIds: step.threadsIds.filter((id) => id !== threadId),
      })
    },
    [step]
  )

  return (
    <ThreadsMultiSelect
      threadsIds={step.threadsIds}
      onAdd={editable ? handleAdd : undefined}
      onRemove={editable ? handleRemove : undefined}
    />
  )
}
