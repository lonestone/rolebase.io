// Duplicate steps content from a meeting to a newly created meeting
// that can have different stepsConfig.

import { useCreateMeetingStepMutation, useGetMeetingStepsLazyQuery } from '@gql'
import { MeetingEntry } from '@shared/model/meeting'
import { pick } from '@utils/pick'
import { useCallback } from 'react'

// We use id to match steps that can be duplicated.
export function useDuplicateMeetingSteps() {
  const [getMeetingSteps] = useGetMeetingStepsLazyQuery()
  const [createMeetingStep] = useCreateMeetingStepMutation()

  return useCallback(async (fromMeetingId: string, toMeeting: MeetingEntry) => {
    const { data } = await getMeetingSteps({
      variables: { meetingId: fromMeetingId },
    })
    const meetingSteps = data?.meeting_step
    if (!meetingSteps) return

    await Promise.all(
      meetingSteps
        .filter((step) =>
          toMeeting.stepsConfig.some(
            (stepConfig) => stepConfig.id === step.stepConfigId
          )
        )
        .map((step) => {
          return createMeetingStep({
            variables: {
              values: {
                meetingId: toMeeting.id,
                ...pick(step, 'stepConfigId', 'type', 'notes', 'data'),
              },
            },
          })
        })
    )
  }, [])
}
