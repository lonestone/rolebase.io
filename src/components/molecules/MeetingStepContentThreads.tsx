import { meetingStepsEntities } from '@api/entities/meetingSteps'
import { MeetingStepThreads } from '@shared/meetingStep'
import { WithId } from '@shared/types'
import React, { useCallback } from 'react'
import ThreadsMultiSelect from './ThreadsMultiSelect'

interface Props {
  meetingId: string
  step: WithId<MeetingStepThreads>
  editable?: boolean
  disableSort: boolean
}

export default function MeetingStepContentThreads({
  meetingId,
  step,
  editable,
  disableSort,
}: Props) {
  // Subscribe meeting steps
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
      disableSort={disableSort}
    />
  )
}
