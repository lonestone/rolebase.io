import {
  MeetingStepFragment,
  useCreateMeetingStepMutation,
  useGetRoleLazyQuery,
} from '@gql'
import { getDefaultMeetingStep } from '@rolebase/shared/model/meeting_step'
import { useCallback, useContext } from 'react'
import useOrgMember from '../../member/hooks/useOrgMember'
import { MeetingContext } from '../contexts/MeetingContext'

// When a meeting is created, it has a stepsConfig property
// but it doesn't have step in meeting_step table.
// So we need to create a step for each stepConfig after meeting edition
export default function useCreateMissingMeetingSteps() {
  const isMember = useOrgMember()
  const { meeting, circle, steps } = useContext(MeetingContext)!
  const [createMeetingStep] = useCreateMeetingStepMutation()
  const [getRole] = useGetRoleLazyQuery()

  return useCallback(
    async (stepsToCopy?: MeetingStepFragment[]) => {
      if (!isMember || !meeting || !circle || !steps) return

      // Get full role
      const { data: roleData } = await getRole({
        variables: { id: circle.roleId },
      })
      const role = roleData?.role_by_pk
      if (!role) return

      // Create all missing steps
      for (const stepConfig of meeting.stepsConfig) {
        if (steps.some((step) => step.stepConfigId === stepConfig.id)) {
          continue
        }

        const newSteps = getDefaultMeetingStep(meeting.id, stepConfig, role)

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
