import { CloseIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import useSortableItem from '@hooks/useSortableItem'
import { TaskEntry } from '@shared/task'
import React from 'react'
import TaskItem from './TaskItem'

interface Props {
  task: TaskEntry
  disabled: boolean
  onRemove?(taskId: string): void
}

export default function TaskSortableItem({ task, onRemove, disabled }: Props) {
  const { attributes, listeners } = useSortableItem(task.id, disabled)

  return (
    <TaskItem
      key={task.id}
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
          onClick={() => onRemove(task.id)}
        />
      )}
    </TaskItem>
  )
}
