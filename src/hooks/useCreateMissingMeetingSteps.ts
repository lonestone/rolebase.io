import {
  CircleFullFragment,
  MeetingFragment,
  MeetingStepFragment,
  Meeting_Step_Type_Enum,
  useCreateMeetingStepMutation,
  useGetCircleThreadsIdsLazyQuery,
} from '@gql'
import { MeetingStepConfig } from '@shared/model/meeting'
import { TasksViewTypes } from '@shared/model/task'
import { useCallback } from 'react'

// When a meeting is created, it has a stepsConfig property
// but it doesn't have step in meeting_step table.
// So we need to create a step for each stepConfig after meeting edition
export default function useCreateMissingMeetingSteps() {
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
    async (
      meeting: MeetingFragment,
      circle: CircleFullFragment,
      existingStepsConfigIds: string[],
      stepsToCopy?: MeetingStepFragment[]
    ) => {
      // Create all missing steps
      for (const stepConfig of meeting.stepsConfig) {
        if (existingStepsConfigIds.includes(stepConfig.id)) {
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
    [getDefaultMeetingStep]
  )
}
