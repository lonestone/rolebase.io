import { Box } from '@chakra-ui/react'
import TasksModule from '@components/organisms/task/TasksModule'
import { MeetingState } from '@hooks/useMeetingState'
import { LogType } from '@shared/model/log'
import { MeetingStepTasks } from '@shared/model/meeting_step'
import { TaskStatus, TasksViewTypes } from '@shared/model/task'
import { WithId } from '@shared/model/types'
import React, { useCallback } from 'react'
import { useUpdateMeetingStepMutation } from 'src/graphql.generated'
import MeetingLogs from './MeetingLogs'

interface Props {
  meetingState: MeetingState
  step: WithId<MeetingStepTasks>
}

export const taskLogTypes = [
  LogType.TaskCreate,
  LogType.TaskUpdate,
  LogType.TaskStatusUpdate,
  LogType.TaskArchive,
]

export default function MeetingStepContentTasks({ meetingState, step }: Props) {
  const { meeting, circle, isEnded } = meetingState
  const [updateMeetingStep] = useUpdateMeetingStepMutation()

  // Persisted filters

  const updateData = useCallback(
    (data: Partial<MeetingStepTasks['data']>) => {
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
    (status: TaskStatus | undefined) =>
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
            expandRight: true,
          }}
          onViewChange={handleViewChange}
          onMemberChange={handleMemberChange}
          onStatusChange={handleStatusChange}
          mb={5}
        />
      )}

      <MeetingLogs
        meetingId={meeting.id}
        includeTypes={taskLogTypes}
        hideEmpty
        mt={5}
      />
    </Box>
  )
}
