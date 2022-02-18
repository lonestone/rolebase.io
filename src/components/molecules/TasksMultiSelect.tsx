import { subscribeAllTasks, subscribeTasksByCircle } from '@api/entities/tasks'
import { Box, VStack } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import useSubscription from '@hooks/useSubscription'
import { TaskEntry } from '@shared/task'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import SearchButtonCombobox from './search/SearchButtonCombobox'
import { SearchItem, SearchItemTypes } from './search/searchItems'
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
  const orgId = useStoreState((state) => state.orgs.currentId)
  console.log('circle', circleId)

  // Subscribe threads
  const subscribe = orgId
    ? circleId
      ? subscribeTasksByCircle(orgId, circleId, false)
      : subscribeAllTasks(orgId, false)
    : undefined
  const { data: tasks, loading, error } = useSubscription(subscribe)

  // Get selected tasks
  const selectedTasks = useMemo(() => {
    console.log('taskseffect', tasksIds)

    return tasksIds
      .map((id) => tasks?.find((m) => m.id === id))
      .filter(Boolean) as TaskEntry[]
  }, [tasksIds, tasks])

  const handleAdd = useCallback(
    (item: SearchItem) => {
      if (item.type === SearchItemTypes.Task) {
        onChange?.([...tasksIds, item.task.id])
      }
    },
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
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      <VStack spacing={0} align="stretch">
        <SortableList items={selectedTasks} onDragEnd={handleDragEnd}>
          {selectedTasks.map((task) => (
            <TaskSortableItem
              key={task.id}
              task={task}
              onRemove={onChange && handleRemove}
            />
          ))}
        </SortableList>
      </VStack>

      {onChange && (!max || selectedTasks.length < max) ? (
        <Box mt={2}>
          <SearchButtonCombobox
            tasks
            tasksOverride={tasks}
            excludeIds={tasksIds}
            size="sm"
            leftIcon={<FiPlus />}
            onSelect={handleAdd}
          >
            {max === 1 ? 'Choisir une tâche' : 'Ajouter une tâche'}
          </SearchButtonCombobox>
        </Box>
      ) : null}
    </>
  )
}
