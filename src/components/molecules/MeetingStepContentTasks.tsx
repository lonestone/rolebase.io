import { meetingStepsEntities } from '@api/entities/meetingSteps'
import { Box, Button, useDisclosure } from '@chakra-ui/react'
import TaskModal from '@components/organisms/task/TaskModal'
import TasksModule from '@components/organisms/task/TasksModule'
import useCurrentMember from '@hooks/useCurrentMember'
import useOrgMember from '@hooks/useOrgMember'
import { LogType } from '@shared/model/log'
import { MeetingStepTasks } from '@shared/model/meetingStep'
import { TaskStatus, TasksViewTypes } from '@shared/model/task'
import { WithId } from '@shared/model/types'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'
import MeetingLogs from './MeetingLogs'

interface Props {
  meetingId: string
  circleId: string
  step: WithId<MeetingStepTasks>
  started: boolean
}

export const taskLogTypes = [
  LogType.TaskCreate,
  LogType.TaskUpdate,
  LogType.TaskStatusUpdate,
  LogType.TaskArchive,
]

export default function MeetingStepContentTasks({
  meetingId,
  circleId,
  step,
  started,
}: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const currentMember = useCurrentMember()

  // Persisted filters
  const { updateMeetingStep } = meetingStepsEntities(meetingId)

  const handleViewChange = useCallback(
    (viewType: TasksViewTypes) => updateMeetingStep(step.id, { viewType }),
    [step.id]
  )

  const handleMemberChange = useCallback(
    (memberId: string | undefined) =>
      updateMeetingStep(step.id, { filterMemberId: memberId || null }),
    [step.id]
  )

  const handleStatusChange = useCallback(
    (status: TaskStatus | undefined) =>
      updateMeetingStep(step.id, { filterStatus: status || null }),
    [step.id]
  )

  // Create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  return (
    <Box mb={5}>
      {started && (
        <>
          <TasksModule
            view={step.viewType || TasksViewTypes.Kanban}
            circleId={circleId}
            memberId={step.filterMemberId || undefined}
            status={step.filterStatus || undefined}
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
        meetingId={meetingId}
        includeTypes={taskLogTypes}
        hideEmpty
        mt={5}
      />

      {isCreateOpen && (
        <TaskModal
          isOpen
          defaultMemberId={currentMember?.id}
          defaultCircleId={circleId}
          onClose={onCreateClose}
        />
      )}
    </Box>
  )
}
