import { MeetingContext } from '@contexts/MeetingContext'
import {
  CircleFullFragment,
  MeetingStepFragment,
  Meeting_Step_Type_Enum,
  useCreateMeetingStepMutation,
  useGetCircleThreadsIdsLazyQuery,
} from '@gql'
import { MeetingStepConfig } from '@shared/model/meeting'
import { TasksViewTypes } from '@shared/model/task'
import { useCallback, useContext } from 'react'
import useOrgMember from './useOrgMember'

// When a meeting is created, it has a stepsConfig property
// but it doesn't have step in meeting_step table.
// So we need to create a step for each stepConfig after meeting edition
export default function useCreateMissingMeetingSteps() {
  const isMember = useOrgMember()
  const { meeting, circle, steps } = useContext(MeetingContext)!
  const [createMeetingStep] = useCreateMeetingStepMutation()
  const [getCircleThreadsIds] = useGetCircleThreadsIdsLazyQuery()

  const getDefaultMeetingStep = useCallback(
    async (
      meetingId: string,
      stepConfig: MeetingStepConfig,
      circle: CircleFullFragment
    ): Promise<Omit<MeetingStepFragment, 'id'>> => {
      const type = stepConfig.type
      const step = {
        meetingId,
        stepConfigId: stepConfig.id,
        notes: '',
        data: {},
      }

      switch (type) {
        case Meeting_Step_Type_Enum.Tour:
          return { ...step, type }

        case Meeting_Step_Type_Enum.Threads: {
          // Get circle's threads
          const { data } = await getCircleThreadsIds({
            variables: { circleId: circle.id },
          })
          if (!data) throw new Error('Error getting circle threads')
          return {
            ...step,
            type,
            data: {
              threadsIds: data.thread.map((thread) => thread.id),
            },
          }
        }

        case Meeting_Step_Type_Enum.Tasks:
          return {
            ...step,
            type,
            data: {
              viewType: TasksViewTypes.Kanban,
              filterMemberId: null,
              filterStatus: null,
            },
          }

        case Meeting_Step_Type_Enum.Checklist:
          return {
            ...step,
            type,
            notes: circle.role.checklist || '',
          }

        case Meeting_Step_Type_Enum.Indicators:
          return {
            ...step,
            type,
            notes: circle.role.indicators || '',
          }
      }
    },
    []
  )

  return useCallback(
    async (stepsToCopy?: MeetingStepFragment[]) => {
      if (!isMember || !meeting || !circle || !steps) return

      // Create all missing steps
      for (const stepConfig of meeting.stepsConfig) {
        if (steps.some((step) => step.stepConfigId === stepConfig.id)) {
          continue
        }

        const newSteps = await getDefaultMeetingStep(
          meeting.id,
          stepConfig,
          circle
        )

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
    [getDefaultMeetingStep, meeting, circle, steps]
  )
}
