import { meetingStepsEntities } from '@api/entities/meetingSteps'
import { MeetingStepThreads } from '@shared/meetingStep'
import { WithId } from '@shared/types'
import React, { useCallback } from 'react'
import ThreadsMultiSelect from './ThreadsMultiSelect'

interface Props {
  meetingId: string
  step: WithId<MeetingStepThreads>
  editable?: Boolean
}

export default function MeetingStepContentThreads({
  meetingId,
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
    <ThreadsMultiSelect
      threadsIds={step.threadsIds}
      onChange={editable ? handleChange : undefined}
    />
  )
}
