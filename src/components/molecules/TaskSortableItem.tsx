import { CloseIcon } from '@chakra-ui/icons'
import { HStack, IconButton, LinkBox } from '@chakra-ui/react'
import TaskLinkOverlay from '@components/atoms/TaskLinkOverlay'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import useSortableItem from '@hooks/useSortableItem'
import useUpdateTaskStatus from '@hooks/useUpdateTaskStatus'
import { TaskEntry, TaskStatus } from '@shared/task'
import React from 'react'
import TaskStatusInput from './TaskStatusInput'

interface Props {
  task: TaskEntry
  disabled: boolean
  onRemove?(taskId: string): void
}

export default function TaskSortableItem({ task, onRemove, disabled }: Props) {
  const hover = useHoverItemStyle()
  const { attributes, listeners } = useSortableItem(task.id, disabled)
  const updateTaskStatus = useUpdateTaskStatus()

  const handleChangeStatus = (status: TaskStatus) => {
    updateTaskStatus(task, status)
  }

  return (
    <LinkBox
      key={task.id}
      px={2}
      py={1}
      _hover={hover}
      {...attributes}
      {...listeners}
    >
      <HStack spacing={3} align="stretch" alignItems="center">
        <TaskStatusInput
          value={task.status}
          onChange={handleChangeStatus}
          zIndex={2}
        />
        <TaskLinkOverlay task={task} />

        {onRemove && (
          <IconButton
            aria-label=""
            size="xs"
            variant="ghost"
            icon={<CloseIcon />}
            zIndex={1}
            onClick={() => onRemove(task.id)}
          />
        )}
      </HStack>
    </LinkBox>
  )
}
