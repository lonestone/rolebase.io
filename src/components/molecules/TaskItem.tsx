import { HStack, LinkBox, Text } from '@chakra-ui/react'
import CircleByIdButton from '@components/atoms/CircleByIdButton'
import TaskLinkOverlay from '@components/atoms/TaskLinkOverlay'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import useUpdateTaskStatus from '@hooks/useUpdateTaskStatus'
import { TaskEntry, TaskStatus } from '@shared/task'
import { formatRelative } from 'date-fns'
import React from 'react'
import { dateFnsLocale } from 'src/locale'
import TaskStatusInput from './TaskStatusInput'

interface Props {
  task: TaskEntry
  showCircle?: boolean
}

export default function TaskItem({ task, showCircle }: Props) {
  const hover = useHoverItemStyle()
  const updateTaskStatus = useUpdateTaskStatus()

  const handleChangeStatus = (status: TaskStatus) => {
    updateTaskStatus(task, status)
  }

  return (
    <LinkBox px={2} py={1} _hover={hover}>
      <HStack>
        <TaskStatusInput
          value={task.status}
          onChange={handleChangeStatus}
          zIndex={2}
        />
        <TaskLinkOverlay task={task} />
        {task.dueDate && (
          <Text fontSize="sm" color="gray.500">
            {formatRelative(task.dueDate.toDate(), new Date(), {
              locale: dateFnsLocale,
            })}
          </Text>
        )}
        {showCircle && <CircleByIdButton circleId={task.circleId} />}
      </HStack>
    </LinkBox>
  )
}
