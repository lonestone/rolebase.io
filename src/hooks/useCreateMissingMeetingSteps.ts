import {
  MeetingStepFragment,
  Meeting_Step_Type_Enum,
  RoleFragment,
  useCreateMeetingStepMutation,
  useGetCircleThreadsIdsLazyQuery,
  useGetMeetingStepsIdsLazyQuery,
  useGetRoleLazyQuery,
} from '@gql'
import { MeetingStepConfig } from '@shared/model/meeting'
import { TasksViewTypes } from '@shared/model/task'
import { useCallback } from 'react'

// When a meeting is created, it has a stepsConfig property
// but it doesn't have step in meeting_step table.
// So we need to create a step for each stepConfig after meeting edition
export default function useCreateMissingMeetingSteps() {
  const [getMeetingStepsIds] = useGetMeetingStepsIdsLazyQuery()
  const [createMeetingStep] = useCreateMeetingStepMutation()
  const [getRole] = useGetRoleLazyQuery()
  const [getCircleThreadsIds] = useGetCircleThreadsIdsLazyQuery()

  const getDefaultMeetingStep = useCallback(
    async (
      meetingId: string,
      stepConfig: MeetingStepConfig,
      circleId: string,
      role: RoleFragment
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
            variables: { circleId },
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
            notes: role.checklist || '',
          }

        case Meeting_Step_Type_Enum.Indicators:
          return {
            ...step,
            type,
            notes: role.indicators || '',
          }
      }
    },
    []
  )

  return useCallback(
    async (
      meetingId: string,
      stepsConfig: MeetingStepConfig[],
      circleId: string,
      roleId: string,
      existingStepsConfigIds?: string[]
    ) => {
      // Get role
      const { data } = await getRole({ variables: { id: roleId } })
      const role = data?.role_by_pk
      if (!role) {
        return console.error(`Error getting circle ${roleId}`)
      }

      // Get steps ids if not provided
      if (!existingStepsConfigIds) {
        const { data } = await getMeetingStepsIds({ variables: { meetingId } })
        existingStepsConfigIds =
          data?.meeting_step?.map((step) => step.stepConfigId) || []
      }

      const missingSteps =
        stepsConfig.filter(
          (stepConfig) => !existingStepsConfigIds?.includes(stepConfig.id)
        ) || []

      // Create all missing steps
      await Promise.all(
        missingSteps.map(async (stepConfig) =>
          createMeetingStep({
            variables: {
              values: await getDefaultMeetingStep(
                meetingId,
                stepConfig,
                circleId,
                role
              ),
            },
          })
        )
      )
    },
    [getDefaultMeetingStep]
  )
}
