import {
  subscribeAllTasks,
  subscribeTasksByCircle,
  subscribeTasksByIds,
} from '@api/entities/tasks'
import { Box, VStack } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import { useOrgId } from '@hooks/useOrgId'
import useSubscription from '@hooks/useSubscription'
import { TaskEntry } from '@shared/task'
import React, { useCallback, useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import TaskSearchButton from './search/entities/tasks/TaskSearchButton'
import SortableList from './SortableList'
import TaskSortableItem from './TaskSortableItem'

interface Props {
  circleId?: string
  tasksIds: string[]
  max?: number
  onChange?(tasksIds: string[]): void
}

export default function TasksMultiSelect({
  circleId,
  tasksIds,
  max,
  onChange,
}: Props) {
  const orgId = useOrgId()

  // Subscribe tasks
  const subscribe = orgId
    ? circleId
      ? subscribeTasksByCircle(orgId, circleId)
      : subscribeAllTasks(orgId)
    : undefined
  const { data: tasks, loading, error } = useSubscription(subscribe)

  // Add missing finished and archived tasks
  const subscribeFinishedTasks = useMemo(() => {
    if (!orgId || !tasks) return
    const missingIds = tasksIds.filter(
      (id) => !tasks.find((task) => task.id === id)
    )
    return subscribeTasksByIds(missingIds)
  }, [orgId, tasks, tasksIds])
  const {
    data: extraTasks,
    loading: extraLoading,
    error: extraError,
  } = useSubscription(subscribeFinishedTasks)

  // Get selected tasks
  const selectedTasks = useMemo(() => {
    if (!tasksIds) return []

    return tasksIds
      .map(
        (id) =>
          tasks?.find((m) => m.id === id) ||
          extraTasks?.find((m) => m.id === id)
      )
      .filter(Boolean) as TaskEntry[]
  }, [tasksIds, tasks, extraTasks])

  const handleAdd = useCallback(
    (id: string) => onChange?.([...tasksIds, id]),
    [tasksIds, onChange]
  )

  const handleRemove = useCallback(
    (threadId: string) => {
      onChange?.(tasksIds.filter((id) => id !== threadId))
    },
    [tasksIds, onChange]
  )

  const handleDragEnd = useCallback(
    (oldIndex: number, newIndex: number) => {
      const newtasksIds = [...tasksIds]
      newtasksIds.splice(newIndex, 0, newtasksIds.splice(oldIndex, 1)[0])
      onChange?.(newtasksIds)
    },
    [tasksIds, onChange]
  )

  return (
    <>
      {(loading || extraLoading) && <Loading active size="md" />}
      <TextErrors errors={[error, extraError]} />

      <VStack spacing={0} align="stretch">
        <SortableList items={selectedTasks} onDragEnd={handleDragEnd}>
          {selectedTasks.map((task) => (
            <TaskSortableItem
              key={task.id}
              task={task}
              onRemove={onChange && handleRemove}
              disabled={!onChange}
            />
          ))}
        </SortableList>
      </VStack>

      {onChange && (!max || selectedTasks.length < max) ? (
        <Box mt={2}>
          <TaskSearchButton
            tasks={tasks || []}
            createCircleId={circleId}
            excludeIds={tasksIds}
            size="sm"
            leftIcon={<FiPlus />}
            onSelect={handleAdd}
          >
            {max === 1 ? 'Choisir une tâche' : 'Ajouter une tâche'}
          </TaskSearchButton>
        </Box>
      ) : null}
    </>
  )
}