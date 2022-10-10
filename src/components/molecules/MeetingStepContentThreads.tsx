import { Box } from '@chakra-ui/react'
import { MeetingState } from '@hooks/useMeetingState'
import { MeetingStepThreads } from '@shared/model/meeting_step'
import { WithId } from '@shared/model/types'
import React, { useCallback } from 'react'
import { useUpdateMeetingStepMutation } from 'src/graphql.generated'
import ThreadsMultiSelect from './ThreadsMultiSelect'

interface Props {
  meetingState: MeetingState
  step: WithId<MeetingStepThreads>
}

export default function MeetingStepContentThreads({
  meetingState,
  step,
}: Props) {
  const { circle, editable } = meetingState
  const [updateMeetingStep] = useUpdateMeetingStepMutation()

  const handleChange = useCallback(
    (threadsIds: string[]) => {
      updateMeetingStep({
        variables: {
          id: step.id,
          values: {
            data: {
              threadsIds,
            },
          },
        },
      })
    },
    [step]
  )

  if (!circle) return null

  return (
    <Box mb={5}>
      <ThreadsMultiSelect
        threadsIds={step.data.threadsIds}
        circleId={circle.id}
        onChange={editable ? handleChange : undefined}
      />
    </Box>
  )
}
