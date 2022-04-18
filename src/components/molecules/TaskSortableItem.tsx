import { CloseIcon } from '@chakra-ui/icons'
import { Flex, IconButton, LinkBox } from '@chakra-ui/react'
import MemberAvatar from '@components/atoms/MemberAvatar'
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
      pr={1}
      py={1}
      _hover={hover}
      {...attributes}
      {...listeners}
      tabIndex={
        // Remove tabIndex because it's redondant with link
        undefined
      }
      zIndex={
        // Remove zIndex to avoid conflict with TaskStatusInput
        undefined
      }
    >
      <Flex>
        <TaskStatusInput
          value={task.status}
          onChange={handleChangeStatus}
          zIndex={2}
          mr={2}
        />

        <TaskLinkOverlay task={task} />

        <MemberAvatar id={task.memberId} size="xs" ml={2} />

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
      </Flex>
    </LinkBox>
  )
}
