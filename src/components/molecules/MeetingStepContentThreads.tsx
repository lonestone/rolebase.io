import { Box } from '@chakra-ui/react'
import { MeetingStepThreads } from '@shared/model/meeting_step'
import { WithId } from '@shared/model/types'
import React, { useCallback, useContext } from 'react'
import { MeetingContext } from 'src/contexts/MeetingContext'
import { useUpdateMeetingStepMutation } from 'src/graphql.generated'
import ThreadsMultiSelect from './ThreadsMultiSelect'

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
