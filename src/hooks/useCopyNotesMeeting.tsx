//  1. Get all meetings and its steps that are before the current meeting and are same recurrence.
//  2. For each step, update the notes of the current meeting.

import {
  MeetingFragment,
  useGetMeetingsLazyQuery,
  useUpdateMeetingStepMutation,
} from '@gql'
import { useCallback } from 'react'

export function useCopyNotesMeeting() {
  const [getMeetings] = useGetMeetingsLazyQuery()
  const [updateMeetingStep] = useUpdateMeetingStepMutation()

  return useCallback(async (fromMeeting: MeetingFragment) => {
    const meetings = await getMeetings({
      variables: {
        recurringId: fromMeeting?.recurringId!,
      },
    })

    const result = meetings.data?.meeting?.findLast(
      (meet) =>
        new Date(meet.recurringDate!) < new Date(fromMeeting?.recurringDate!)
    )

    const meetingSteps = result?.steps
    if (!meetingSteps) return

    await Promise.all(
      meetingSteps
        .filter((step) =>
          fromMeeting.stepsConfig.some(
            (stepConfig) => stepConfig.id === step.stepConfigId
          )
        )
        .map((step) => {
          fromMeeting.steps.map((fromStep) => {
            return updateMeetingStep({
              variables: {
                id: fromStep.id,
                values: {
                  notes: step.notes,
                },
              },
            })
          })
        })
    )
  }, [])
}
