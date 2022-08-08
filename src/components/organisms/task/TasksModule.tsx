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
import CircleSearchButton from '@components/molecules/search/entities/circles/CircleSearchButton'
import CircleSearchInput from '@components/molecules/search/entities/circles/CircleSearchInput'
import MemberSearchButton from '@components/molecules/search/entities/members/MemberSearchButton'
import MemberSearchInput from '@components/molecules/search/entities/members/MemberSearchInput'
import TasksKanban from '@components/molecules/TasksKanban'
import TasksList from '@components/molecules/TasksList'
import TasksStatusFilter from '@components/molecules/TasksStatusFilter'
import { useTasks } from '@hooks/useTasks'
import { TaskStatus, TasksViewTypes } from '@shared/model/task'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiList, FiTrello } from 'react-icons/fi'

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
        <TabList alignItems="center" flexWrap="wrap">
          <StyledTab icon={<FiTrello />}>{t('TasksModule.kanban')}</StyledTab>
          <StyledTab icon={<FiList />}>{t('TasksModule.list')}</StyledTab>

          {loading && <Loading active size="sm" />}

          <Spacer />

          <Flex flexWrap="wrap">
            {view === TasksViewTypes.List && onStatusChange && (
              <TasksStatusFilter value={status} onChange={onStatusChange} />
            )}
            {onCircleChange &&
              (circleId ? (
                <CircleSearchInput
                  value={circleId}
                  size="sm"
                  mx={1}
                  maxW="300px"
                  placeholder={t('TasksModule.filterCircle')}
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
                  {t('TasksModule.filterCircle')}
                </CircleSearchButton>
              ))}

            {onMemberChange &&
              (memberId ? (
                <MemberSearchInput
                  value={memberId}
                  size="sm"
                  mx={1}
                  maxW="300px"
                  placeholder={t('TasksModule.filterMember')}
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
                  {t('TasksModule.filterMember')}
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
