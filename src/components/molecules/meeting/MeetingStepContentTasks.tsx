import { Box } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { Task_Status_Enum, useUpdateMeetingStepMutation } from '@gql'
import TasksModule from '@organisms/task/TasksModule'
import { LogType } from '@shared/model/log'
import { MeetingStepTasksFragment } from '@shared/model/meeting_step'
import { TasksViewTypes } from '@shared/model/task'
import React, { useCallback, useContext } from 'react'
import MeetingLogs from './MeetingLogs'

interface Props {
  step: MeetingStepTasksFragment
}

export const taskLogTypes = [
  LogType.TaskCreate,
  LogType.TaskUpdate,
  LogType.TaskStatusUpdate,
  LogType.TaskArchive,
]

export default function MeetingStepContentTasks({ step }: Props) {
  const { meeting, circle, isEnded } = useContext(MeetingContext)!
  const [updateMeetingStep] = useUpdateMeetingStepMutation()

  // Persisted filters

  const updateData = useCallback(
    (data: Partial<MeetingStepTasksFragment['data']>) => {
      updateMeetingStep({
        variables: {
          id: step.id,
          values: {
            data: { ...step.data, ...data },
          },
        },
      })
    },
    [step.id]
  )

  const handleViewChange = useCallback(
    (viewType: TasksViewTypes) => updateData({ viewType }),
    [updateData]
  )

  const handleMemberChange = useCallback(
    (memberId: string | undefined) =>
      updateData({ filterMemberId: memberId || null }),
    [updateData]
  )

  const handleStatusChange = useCallback(
    (status: Task_Status_Enum | undefined) =>
      updateData({ filterStatus: status || null }),
    [updateData]
  )

  if (!meeting || !circle) return null

  return (
    <Box mb={5}>
      {!isEnded && (
        <TasksModule
          view={step.data.viewType || TasksViewTypes.Kanban}
          circleId={circle.id}
          memberId={step.data.filterMemberId || undefined}
          status={step.data.filterStatus || undefined}
          overflowContainer={{
            expandLeft: true,
            expandRight: true,
          }}
          onViewChange={handleViewChange}
          onMemberChange={handleMemberChange}
          onStatusChange={handleStatusChange}
          mt={5}
          mb={10}
        />
      )}

      <MeetingLogs
        meetingId={meeting.id}
        includeTypes={taskLogTypes}
        hideEmpty
      />
    </Box>
  )
}
