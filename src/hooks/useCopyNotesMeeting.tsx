//  1. Get all meetings and its steps that are before the current meeting and are same recurrence.
//  2. For each step, update the notes of the current meeting.

import {
  MeetingFragment,
  useGetMeetingsLazyQuery,
  useUpdateMeetingStepMutation,
  useGetMeetingStepsLazyQuery,
} from '@gql'
import { useCallback } from 'react'

export function useCopyNotesMeeting() {
  const [getMeetings] = useGetMeetingsLazyQuery()
  const [getMeetingSteps] = useGetMeetingStepsLazyQuery()
  const [updateMeetingStep] = useUpdateMeetingStepMutation()

  return useCallback(async (fromMeeting: MeetingFragment) => {
    const meetings = await getMeetings({
      variables: {
        recurringId: fromMeeting?.recurringId!,
        recurringDate: fromMeeting?.recurringDate!,
      },
    })

    const meetingSteps = meetings?.data?.meeting[0].steps
    if (!meetingSteps) return

    const { data } = await getMeetingSteps({
      variables: { meetingId: fromMeeting.id },
    })

    const fromMeetingSteps = data?.meeting_step || []

    await Promise.all(
      meetingSteps.map((step) => {
        fromMeetingSteps.map((fromStep) => {
          if (
            fromStep.type === step.type ||
            fromStep.stepConfigId === step.stepConfigId
          )
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
