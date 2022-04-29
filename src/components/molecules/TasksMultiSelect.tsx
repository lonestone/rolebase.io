import { subscribeAllTasks, subscribeTasksByCircle } from '@api/entities/tasks'
import { Box, VStack } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import { useOrgId } from '@hooks/useOrgId'
import useSubscription from '@hooks/useSubscription'
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

  // Prepare sortable items
  const items = useMemo(() => tasksIds.map((id) => ({ id })), [tasksIds])

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
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      <VStack spacing={0} align="stretch">
        <SortableList items={items} onDragEnd={handleDragEnd}>
          {items.map((item) => (
            <TaskSortableItem
              key={item.id}
              taskId={item.id}
              onRemove={onChange && handleRemove}
              disabled={!onChange}
            />
          ))}
        </SortableList>
      </VStack>

      {onChange && (!max || items.length < max) ? (
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
