import IconTextButton from '@atoms/IconTextButton'
import Loading from '@atoms/Loading'
import OverflowContainer, {
  OverflowContainerProps,
} from '@atoms/OverflowContainer'
import TextErrors from '@atoms/TextErrors'
import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import { Task_Status_Enum } from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import useOrgMember from '@hooks/useOrgMember'
import { useTasks } from '@hooks/useTasks'
import CircleSearchButton from '@molecules/search/entities/circles/CircleSearchButton'
import CircleSearchInput from '@molecules/search/entities/circles/CircleSearchInput'
import MemberSearchButton from '@molecules/search/entities/members/MemberSearchButton'
import MemberSearchInput from '@molecules/search/entities/members/MemberSearchInput'
import TasksFilterStatus from '@molecules/task/TasksFilterStatus'
import TasksKanban from '@molecules/task/TasksKanban'
import TasksList from '@molecules/task/TasksList'
import { TasksViewTypes } from '@shared/model/task'
import React, { ReactNode, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiList, FiPlus, FiTrello } from 'react-icons/fi'
import TaskModal from './TaskModal'

interface Props extends BoxProps {
  view: TasksViewTypes
  circleId?: string
  memberId?: string
  status?: Task_Status_Enum
  header?: ReactNode
  headerPaddingBottom?: string | number
  overflowContainer?: OverflowContainerProps
  onViewChange: (view: TasksViewTypes) => void
  onCircleChange?: (circleId: string | undefined) => void
  onMemberChange?: (memberId: string | undefined) => void
  onStatusChange?: (status: Task_Status_Enum | undefined) => void
}

export default function TasksModule({
  view,
  circleId,
  memberId,
  status,
  header,
  headerPaddingBottom,
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
        onStatusChange?.(Task_Status_Enum.Done)
      }),
    [onViewChange, onStatusChange]
  )

  const modal = useDisclosure()

  return (
    <Box {...boxProps}>
      <Flex alignItems="center" flexWrap="wrap" mb={headerPaddingBottom || 5}>
        {header}

        <ButtonGroup isAttached variant="outline" size="sm" mb={3}>
          <IconTextButton
            className="userflow-tasks-kanban"
            aria-label={t('TasksModule.kanban')}
            showText
            icon={<FiTrello />}
            isActive={view === TasksViewTypes.Kanban}
            onClick={() => onViewChange(TasksViewTypes.Kanban)}
          />
          <IconTextButton
            className="userflow-tasks-list"
            aria-label={t('TasksModule.list')}
            showText
            icon={<FiList />}
            isActive={view === TasksViewTypes.List}
            onClick={() => onViewChange(TasksViewTypes.List)}
          />
        </ButtonGroup>

        <Spacer />

        <ButtonGroup size="sm" variant="outline" spacing={1} mr={5} mb={3}>
          {view === TasksViewTypes.List && onStatusChange && (
            <Box>
              <TasksFilterStatus value={status} onChange={onStatusChange} />
            </Box>
          )}
          {onCircleChange &&
            (circleId ? (
              <CircleSearchInput
                className="userflow-tasks-role"
                value={circleId}
                placeholder={t('TasksModule.filterCircle')}
                maxW="170px"
                onChange={onCircleChange}
                onClear={() => onCircleChange(undefined)}
              />
            ) : (
              <CircleSearchButton
                className="userflow-tasks-role"
                rightIcon={<FiChevronDown />}
                onSelect={onCircleChange}
              >
                {t('TasksModule.filterCircle')}
              </CircleSearchButton>
            ))}

          {onMemberChange &&
            (memberId ? (
              <MemberSearchInput
                className="userflow-tasks-member"
                value={memberId}
                placeholder={t('TasksModule.filterMember')}
                maxW="170px"
                onChange={onMemberChange}
                onClear={() => onMemberChange(undefined)}
              />
            ) : (
              <MemberSearchButton
                className="userflow-tasks-member"
                rightIcon={<FiChevronDown />}
                onSelect={onMemberChange}
              >
                {t('TasksModule.filterMember')}
              </MemberSearchButton>
            ))}
        </ButtonGroup>

        {isMember && (
          <Button
            className="userflow-tasks-create"
            size="sm"
            colorScheme="blue"
            mb={3}
            leftIcon={<FiPlus />}
            onClick={modal.onOpen}
          >
            {t('TasksPage.create')}
          </Button>
        )}
      </Flex>

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {view === TasksViewTypes.Kanban && (
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
        <Container maxW="3xl" p={0}>
          <TasksList
            tasks={tasks}
            onOrderChange={isMember ? changeOrder : undefined}
            showMember={!memberId}
            showCircle={!circleId}
          />
        </Container>
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
