import { CloseIcon } from '@chakra-ui/icons'
import { HStack, IconButton, LinkBox } from '@chakra-ui/react'
import TaskLinkOverlay from '@components/atoms/TaskLinkOverlay'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import useSortableItem from '@hooks/useSortableItem'
import { TaskEntry } from '@shared/task'
import React from 'react'
import { FiMessageSquare } from 'react-icons/fi'

interface Props {
  task: TaskEntry
  onRemove?(taskId: string): void
}

export default function TaskSortableItem({ task, onRemove }: Props) {
  const hover = useHoverItemStyle()
  const { attributes, listeners } = useSortableItem(task.id)

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
        <FiMessageSquare />
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
