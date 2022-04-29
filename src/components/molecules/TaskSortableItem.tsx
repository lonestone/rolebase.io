import { subscribeTask } from '@api/entities/tasks'
import { CloseIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import useSortableItem from '@hooks/useSortableItem'
import useSubscription from '@hooks/useSubscription'
import React from 'react'
import TaskItem from './TaskItem'

interface Props {
  taskId: string
  disabled: boolean
  onRemove?(taskId: string): void
}

export default function TaskSortableItem({
  taskId,
  onRemove,
  disabled,
}: Props) {
  const { data: task } = useSubscription(subscribeTask(taskId))
  const { attributes, listeners } = useSortableItem(taskId, disabled)

  if (!task) return null
  return (
    <TaskItem
      key={taskId}
      task={task}
      {...attributes}
      {...listeners}
      zIndex={
        // Remove zIndex to avoid conflict with TaskStatusInput
        undefined
      }
    >
      {onRemove && (
        <IconButton
          aria-label=""
          size="xs"
          variant="ghost"
          icon={<CloseIcon />}
          ml={2}
          zIndex={1}
          onClick={() => onRemove(taskId)}
        />
      )}
    </TaskItem>
  )
}
