import { Box, Button, useDisclosure } from '@chakra-ui/react'
import TaskModal from '@components/organisms/task/TaskModal'
import TasksModule from '@components/organisms/task/TasksModule'
import useCurrentMember from '@hooks/useCurrentMember'
import { MeetingState } from '@hooks/useMeetingState'
import useOrgMember from '@hooks/useOrgMember'
import { LogType } from '@shared/model/log'
import { MeetingStepTasks } from '@shared/model/meeting_step'
import { TaskStatus, TasksViewTypes } from '@shared/model/task'
import { WithId } from '@shared/model/types'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'
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
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const currentMember = useCurrentMember()
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

  // Create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  if (!meeting || !circle) return null

  return (
    <Box mb={5}>
      {!isEnded && (
        <>
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

          {isMember && (
            <Button size="sm" leftIcon={<FiPlus />} onClick={onCreateOpen}>
              {t('MeetingStepContentTasks.create')}
            </Button>
          )}
        </>
      )}

      <MeetingLogs
        meetingId={meeting.id}
        includeTypes={taskLogTypes}
        hideEmpty
        mt={5}
      />

      {isCreateOpen && (
        <TaskModal
          isOpen
          defaultMemberId={currentMember?.id}
          defaultCircleId={circle.id}
          onClose={onCreateClose}
        />
      )}
    </Box>
  )
}
