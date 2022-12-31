import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import IconTextButton from '@components/atoms/IconTextButton'
import Loading from '@components/atoms/Loading'
import OverflowContainer, {
  OverflowContainerProps,
} from '@components/atoms/OverflowContainer'
import TextErrors from '@components/atoms/TextErrors'
import CircleSearchButton from '@components/molecules/search/entities/circles/CircleSearchButton'
import CircleSearchInput from '@components/molecules/search/entities/circles/CircleSearchInput'
import MemberSearchButton from '@components/molecules/search/entities/members/MemberSearchButton'
import MemberSearchInput from '@components/molecules/search/entities/members/MemberSearchInput'
import TasksFilterStatus from '@components/molecules/TasksFilterStatus'
import TasksKanban from '@components/molecules/TasksKanban'
import TasksList from '@components/molecules/TasksList'
import useCurrentMember from '@hooks/useCurrentMember'
import useOrgMember from '@hooks/useOrgMember'
import { useTasks } from '@hooks/useTasks'
import { TaskStatus, TasksViewTypes } from '@shared/model/task'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiList, FiPlus, FiTrello } from 'react-icons/fi'
import TaskModal from './TaskModal'

interface Props extends BoxProps {
  view: TasksViewTypes
  circleId?: string
  memberId?: string
  status?: TaskStatus
  overflowContainer?: OverflowContainerProps
  onViewChange: (view: TasksViewTypes) => void
  onCircleChange?: (circleId: string | undefined) => void
  onMemberChange?: (memberId: string | undefined) => void
  onStatusChange?: (status: TaskStatus | undefined) => void
}

export default function TasksModule({
  view,
  circleId,
  memberId,
  status,
  overflowContainer,
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

  // Subscribe to tasks
  const { tasks, loading, error, changeOrder } = useTasks(view, {
    memberId,
    circleId,
    status,
  })

  const handleDoneTasksClick = useMemo(
    () =>
      onStatusChange &&
      (() => {
        onViewChange(TasksViewTypes.List)
        onStatusChange?.(TaskStatus.Done)
      }),
    [onViewChange, onStatusChange]
  )

  const modal = useDisclosure()

  return (
    <Box {...boxProps}>
      <Flex alignItems="center" flexWrap="wrap" mb={5}>
        <ButtonGroup size="sm" variant="outline" spacing={1}>
          {view === TasksViewTypes.List && onStatusChange && (
            <Box>
              <TasksFilterStatus value={status} onChange={onStatusChange} />
            </Box>
          )}
          {onCircleChange &&
            (circleId ? (
              <CircleSearchInput
                value={circleId}
                placeholder={t('TasksModule.filterCircle')}
                onChange={onCircleChange}
                onClear={() => onCircleChange(undefined)}
              />
            ) : (
              <CircleSearchButton
                rightIcon={<FiChevronDown />}
                onSelect={onCircleChange}
              >
                {t('TasksModule.filterCircle')}
              </CircleSearchButton>
            ))}

          {onMemberChange &&
            (memberId ? (
              <MemberSearchInput
                value={memberId}
                placeholder={t('TasksModule.filterMember')}
                onChange={onMemberChange}
                onClear={() => onMemberChange(undefined)}
              />
            ) : (
              <MemberSearchButton
                rightIcon={<FiChevronDown />}
                onSelect={onMemberChange}
              >
                {t('TasksModule.filterMember')}
              </MemberSearchButton>
            ))}
        </ButtonGroup>

        <Spacer />

        <ButtonGroup isAttached variant="outline" size="sm" mr={2}>
          <IconTextButton
            aria-label={t('TasksModule.kanban')}
            icon={<FiTrello />}
            isActive={view === TasksViewTypes.Kanban}
            onClick={() => onViewChange(TasksViewTypes.Kanban)}
          />
          <IconTextButton
            aria-label={t('TasksModule.list')}
            icon={<FiList />}
            isActive={view === TasksViewTypes.List}
            onClick={() => onViewChange(TasksViewTypes.List)}
          />
        </ButtonGroup>

        {isMember && (
          <Button
            size="sm"
            colorScheme="blue"
            leftIcon={<FiPlus />}
            onClick={modal.onOpen}
          >
            {t('TasksPage.create')}
          </Button>
        )}
      </Flex>

      {loading && <Loading active size="sm" />}
      <TextErrors errors={[error]} />

      {!loading && view === TasksViewTypes.Kanban && (
        <OverflowContainer {...overflowContainer}>
          <TasksKanban
            tasks={tasks}
            onOrderChange={isMember ? changeOrder : undefined}
            showMember={!memberId}
            showCircle={!circleId}
            onDoneTasksClick={handleDoneTasksClick}
          />
        </OverflowContainer>
      )}

      {!loading && view === TasksViewTypes.List && (
        <TasksList
          tasks={tasks}
          onOrderChange={isMember ? changeOrder : undefined}
          showMember={!memberId}
          showCircle={!circleId}
        />
      )}

      {modal.isOpen && (
        <TaskModal
          isOpen
          defaultMemberId={memberId || currentMember?.id}
          defaultCircleId={circleId}
          onClose={modal.onClose}
        />
      )}
    </Box>
  )
}
