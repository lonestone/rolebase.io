import { Box } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { useUpdateMeetingStepMutation } from '@gql'
import { MeetingStepThreads } from '@shared/model/meeting_step'
import { WithId } from '@shared/model/types'
import React, { useCallback, useContext } from 'react'
import ThreadsMultiSelect from '../thread/ThreadsMultiSelect'

interface Props {
  step: WithId<MeetingStepThreads>
}

export default function MeetingStepContentThreads({ step }: Props) {
  const { circle, editable } = useContext(MeetingContext)!
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
