import {
  Box,
  BoxProps,
  Flex,
  Spacer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import OverflowContainer, {
  OverflowContainerProps,
} from '@components/atoms/OverflowContainer'
import { StyledTab } from '@components/atoms/StyledTab'
import TextErrors from '@components/atoms/TextErrors'
import TasksKanban from '@components/organisms/TasksKanban'
import TasksList from '@components/organisms/TasksList'
import { useTasks } from '@hooks/useTasks'
import { TaskStatus, TasksViewTypes } from '@shared/model/task'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiList, FiTrello } from 'react-icons/fi'
import CircleSearchButton from '../molecules/search/entities/circles/CircleSearchButton'
import CircleSearchInput from '../molecules/search/entities/circles/CircleSearchInput'
import MemberSearchButton from '../molecules/search/entities/members/MemberSearchButton'
import MemberSearchInput from '../molecules/search/entities/members/MemberSearchInput'
import TasksStatusFilter from '../molecules/TasksStatusFilter'

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

const tabs = [TasksViewTypes.Kanban, TasksViewTypes.List]

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

  return (
    <Box {...boxProps}>
      <Tabs
        index={tabs.indexOf(view)}
        onChange={(i) => onViewChange(tabs[i])}
        isLazy
        variant="unstyled"
      >
        <TabList alignItems="center">
          <StyledTab icon={<FiTrello />}>
            {t('organisms.TasksModule.kanban')}
          </StyledTab>
          <StyledTab icon={<FiList />}>
            {t('organisms.TasksModule.list')}
          </StyledTab>

          {loading && <Loading active size="sm" />}

          <Spacer />

          <Flex h={8}>
            {view === TasksViewTypes.List && onStatusChange && (
              <TasksStatusFilter value={status} onChange={onStatusChange} />
            )}
            {onCircleChange &&
              (circleId ? (
                <CircleSearchInput
                  value={circleId}
                  size="sm"
                  mx={1}
                  placeholder={t('organisms.TasksModule.filterCircle')}
                  onChange={onCircleChange}
                  onClear={() => onCircleChange(undefined)}
                />
              ) : (
                <CircleSearchButton
                  size="sm"
                  variant="ghost"
                  rightIcon={<FiChevronDown />}
                  onSelect={onCircleChange}
                >
                  {t('organisms.TasksModule.filterCircle')}
                </CircleSearchButton>
              ))}

            {onMemberChange &&
              (memberId ? (
                <MemberSearchInput
                  value={memberId}
                  size="sm"
                  mx={1}
                  placeholder={t('organisms.TasksModule.filterMember')}
                  onChange={onMemberChange}
                  onClear={() => onMemberChange(undefined)}
                />
              ) : (
                <MemberSearchButton
                  size="sm"
                  variant="ghost"
                  rightIcon={<FiChevronDown />}
                  onSelect={onMemberChange}
                >
                  {t('organisms.TasksModule.filterMember')}
                </MemberSearchButton>
              ))}
          </Flex>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <OverflowContainer {...overflowContainer}>
              <TasksKanban
                tasks={tasks}
                onOrderChange={changeOrder}
                showMember={!memberId}
                showCircle={!circleId}
                onDoneTasksClick={handleDoneTasksClick}
              />
            </OverflowContainer>
          </TabPanel>
          <TabPanel px={0}>
            <TasksList
              tasks={tasks}
              onOrderChange={changeOrder}
              showMember={!memberId}
              showCircle={!circleId}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <TextErrors errors={[error]} />
    </Box>
  )
}
