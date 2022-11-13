import { CircleWithRoleEntry } from '@shared/model/circle'
import { MeetingStepConfig } from '@shared/model/meeting'
import { MeetingStep, MeetingStepTypes } from '@shared/model/meeting_step'
import { TasksViewTypes } from '@shared/model/task'
import { useCallback } from 'react'
import {
  useCreateMeetingStepMutation,
  useGetCircleThreadsIdsLazyQuery,
  useGetMeetingStepsIdsLazyQuery,
} from 'src/graphql.generated'

// When a meeting is created, it has a stepsConfig property
// but it doesn't have any content in steps collection.
// So we need to create a step for each stepConfig after meeting edition
export default function useCreateMissingMeetingSteps() {
  const [getMeetingStepsIds] = useGetMeetingStepsIdsLazyQuery()
  const [createMeetingStep] = useCreateMeetingStepMutation()
  const [getCircleThreadsIds] = useGetCircleThreadsIdsLazyQuery()

  const getDefaultMeetingStep = useCallback(
    async (
      meetingId: string,
      stepConfig: MeetingStepConfig,
      circle: CircleWithRoleEntry
    ): Promise<MeetingStep> => {
      const type = stepConfig.type
      const step = {
        meetingId,
        stepConfigId: stepConfig.id,
        notes: '',
        data: {},
      }

      switch (type) {
        case MeetingStepTypes.Tour:
          return { ...step, type }

        case MeetingStepTypes.Threads: {
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

        case MeetingStepTypes.Tasks:
          return {
            ...step,
            type,
            data: {
              viewType: TasksViewTypes.Kanban,
              filterMemberId: null,
              filterStatus: null,
            },
          }

        case MeetingStepTypes.Checklist:
          return {
            ...step,
            type,
            notes: circle.role.checklist,
          }

        case MeetingStepTypes.Indicators:
          return {
            ...step,
            type,
            notes: circle.role.indicators,
          }
      }
    },
    []
  )

  return useCallback(
    async (
      meetingId: string,
      stepsConfig: MeetingStepConfig[],
      circle: CircleWithRoleEntry
    ) => {
      const { data } = await getMeetingStepsIds({ variables: { meetingId } })
      const meetingSteps = data?.meeting_step
      const missingSteps =
        stepsConfig.filter(
          (stepConfig) =>
            !meetingSteps?.find((step) => step.stepConfigId === stepConfig.id)
        ) || []

      await Promise.all(
        missingSteps.map(async (stepConfig) =>
          createMeetingStep({
            variables: {
              values: await getDefaultMeetingStep(
                meetingId,
                stepConfig,
                circle
              ),
            },
          })
        )
      )
    },
    []
  )
}
