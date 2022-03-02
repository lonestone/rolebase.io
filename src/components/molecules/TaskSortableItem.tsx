import { updateTask } from '@api/entities/tasks'
import { Timestamp } from 'firebase/firestore'
import { CloseIcon } from '@chakra-ui/icons'
import { Checkbox, HStack, IconButton, LinkBox } from '@chakra-ui/react'
import TaskLinkOverlay from '@components/atoms/TaskLinkOverlay'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import useSortableItem from '@hooks/useSortableItem'
import { TaskEntry } from '@shared/task'
import React, { useCallback } from 'react'

interface Props {
  task: TaskEntry
  disabled: boolean
  onRemove?(taskId: string): void
}

export default function TaskSortableItem({ task, onRemove, disabled }: Props) {
  const hover = useHoverItemStyle()
  const { attributes, listeners } = useSortableItem(task.id, disabled)
  const handleToggleDone = useCallback(() => {
    const doneDate = task.doneDate ? null : Timestamp.now()
    updateTask(task.id, { doneDate })
  }, [task])
  return (
    <LinkBox
      key={task.id}
      px={2}
      py={1}
      _hover={hover}
      {...attributes}
      {...listeners}
      disabled
    >
      <HStack spacing={3} align="stretch" alignItems="center">
        <Checkbox
          isChecked={!!task.doneDate}
          onChange={handleToggleDone}
          zIndex={1}
        />
        <TaskLinkOverlay task={task} />

        {onRemove && (
          <IconButton
            aria-label=""
            size="sm"
            icon={<CloseIcon />}
            onClick={() => onRemove(task.id)}
          />
        )}
      </HStack>
    </LinkBox>
  )
}
