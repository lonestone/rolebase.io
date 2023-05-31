//  1. Get all meetings and its steps that are before the current meeting and are same recurrence.
//  2. For each step, update the notes of the current meeting.

import {
  MeetingFragment,
  useUpdateMeetingStepMutation,
  useGetLastMeetingStepsLazyQuery,
  MeetingStepFragment,
} from '@gql'
import { useCallback } from 'react'

export function useCopyNotesMeeting() {
  const [getLastMeetingSteps] = useGetLastMeetingStepsLazyQuery()
  const [updateMeetingStep] = useUpdateMeetingStepMutation()

  return useCallback(
    async (
      toMeeting: MeetingFragment,
      toMeetingSteps?: MeetingStepFragment[]
    ) => {
      const meetings = await getLastMeetingSteps({
        variables: {
          recurringId: toMeeting?.recurringId!,
          recurringDate: toMeeting?.recurringDate!,
        },
      })

      const meetingSteps = meetings?.data?.meeting[0].steps
      if (!meetingSteps) return

      const fromMeetingSteps = toMeetingSteps || []

      await Promise.all(
        meetingSteps.map((step) => {
          const result = fromMeetingSteps.find((fromStep) => {
            return (
              fromStep.type === step.type ||
              fromStep.stepConfigId === step.stepConfigId
            )
          })
          return updateMeetingStep({
            variables: {
              id: result?.id!,
              values: {
                notes: step.notes,
              },
            },
          })
        })
      )
    },
    []
  )
}
