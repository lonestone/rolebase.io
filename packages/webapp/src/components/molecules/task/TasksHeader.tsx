import IconTextButton from '@atoms/IconTextButton'
import {
  BoxProps,
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import { Task_Status_Enum } from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import useOrgMember from '@hooks/useOrgMember'
import CircleAndMemberFilters from '@molecules/CircleAndMemberFilters'
import TaskModal from '@organisms/task/TaskModal'
import { TasksViewTypes } from '@shared/model/task'
import React, { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateIcon, KanbanIcon, TasksListIcon } from 'src/icons'

export interface TasksParams {
  view: TasksViewTypes
  circleId?: string
  memberId?: string
  status?: Task_Status_Enum
  onViewChange: (view: TasksViewTypes) => void
  onCircleChange?: (circleId: string | undefined) => void
  onMemberChange?: (memberId: string | undefined) => void
  onStatusChange?: (status: Task_Status_Enum | undefined) => void
}

interface Props extends TasksParams, Omit<BoxProps, 'title'> {
  title?: ReactNode
}

export default function TasksHeader({
  title,
  view,
  circleId,
  memberId,
  status,
  onViewChange,
  onCircleChange,
  onMemberChange,
  onStatusChange,
  ...boxProps
}: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const currentMember = useCurrentMember()

  // Reset status filter when switching to kanban view
  useEffect(() => {
    if (view === TasksViewTypes.Kanban && status !== undefined) {
      onStatusChange?.(undefined)
    }
  }, [view, onStatusChange])

  const modal = useDisclosure()

  return (
    <Flex w="100%" alignItems="center" flexWrap="wrap" {...boxProps}>
      {title}

      <ButtonGroup isAttached variant="outline" size="sm" my={2}>
        <IconTextButton
          className="userflow-tasks-kanban"
          aria-label={t('TasksHeader.kanban')}
          showText
          icon={<KanbanIcon size={18} />}
          fontWeight={view === TasksViewTypes.Kanban ? 'bold' : 'normal'}
          onClick={() => onViewChange(TasksViewTypes.Kanban)}
        />
        <IconTextButton
          className="userflow-tasks-list"
          aria-label={t('TasksHeader.list')}
          showText
          icon={<TasksListIcon size={18} />}
          fontWeight={view === TasksViewTypes.List ? 'bold' : 'normal'}
          onClick={() => onViewChange(TasksViewTypes.List)}
        />
      </ButtonGroup>

      <CircleAndMemberFilters
        circleId={circleId}
        memberId={memberId}
        ml={5}
        my={2}
        onCircleChange={onCircleChange}
        onMemberChange={onMemberChange}
      />

      <Spacer />

      {isMember && (
        <Button
          className="userflow-tasks-create"
          size="sm"
          colorScheme="blue"
          my={2}
          leftIcon={<CreateIcon size={20} />}
          onClick={modal.onOpen}
        >
          {t('TasksPage.create')}
        </Button>
      )}

      {modal.isOpen && (
        <TaskModal
          isOpen
          defaultMemberId={memberId || currentMember?.id}
          defaultCircleId={circleId}
          onClose={modal.onClose}
        />
      )}
    </Flex>
  )
}
