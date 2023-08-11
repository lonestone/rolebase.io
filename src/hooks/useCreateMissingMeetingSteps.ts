import { MeetingContext } from '@contexts/MeetingContext'
import { MeetingStepFragment, useCreateMeetingStepMutation } from '@gql'
import { getDefaultMeetingStep } from '@shared/model/meeting_step'
import { useCallback, useContext } from 'react'
import useOrgMember from './useOrgMember'

// When a meeting is created, it has a stepsConfig property
// but it doesn't have step in meeting_step table.
// So we need to create a step for each stepConfig after meeting edition
export default function useCreateMissingMeetingSteps() {
  const isMember = useOrgMember()
  const { meeting, circle, steps } = useContext(MeetingContext)!
  const [createMeetingStep] = useCreateMeetingStepMutation()

  return useCallback(
    async (stepsToCopy?: MeetingStepFragment[]) => {
      if (!isMember || !meeting || !circle || !steps) return

      // Create all missing steps
      for (const stepConfig of meeting.stepsConfig) {
        if (steps.some((step) => step.stepConfigId === stepConfig.id)) {
          continue
        }

        const newSteps = getDefaultMeetingStep(meeting.id, stepConfig, circle)

        // Copy step content?
        const stepToCopy = stepsToCopy?.find(
          (step) => step.stepConfigId === stepConfig.id
        )
        if (stepToCopy) {
          newSteps.notes = stepToCopy.notes
        }

        await createMeetingStep({
          variables: {
            values: newSteps,
          },
        })
      }
    },
    [meeting, circle, steps]
  )
}
