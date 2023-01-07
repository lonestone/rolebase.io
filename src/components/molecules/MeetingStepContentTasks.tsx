import { Box, Heading } from '@chakra-ui/react'
import TasksModule from '@components/organisms/task/TasksModule'
import { LogType } from '@shared/model/log'
import { MeetingStepTasks } from '@shared/model/meeting_step'
import { TaskStatus, TasksViewTypes } from '@shared/model/task'
import { WithId } from '@shared/model/types'
import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { MeetingContext } from 'src/contexts/MeetingContext'
import { useUpdateMeetingStepMutation } from 'src/graphql.generated'
import MeetingLogs from './MeetingLogs'

interface Props {
  step: WithId<MeetingStepTasks>
}

export const taskLogTypes = [
  LogType.TaskCreate,
  LogType.TaskUpdate,
  LogType.TaskStatusUpdate,
  LogType.TaskArchive,
]

export default function MeetingStepContentTasks({ step }: Props) {
  const { t } = useTranslation()
  const { meeting, circle, isEnded } = useContext(MeetingContext)!
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
        header={
          <Heading as="h3" size="sm" mb={2}>
            {t('MeetingStepContentTasks.logs')}
          </Heading>
        }
        mt={5}
      />
    </Box>
  )
}
