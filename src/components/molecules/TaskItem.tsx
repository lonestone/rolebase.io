import { Checkbox, HStack, LinkBox, Text } from '@chakra-ui/react'
import CircleByIdButton from '@components/atoms/CircleByIdButton'
import TaskLinkOverlay from '@components/atoms/TaskLinkOverlay'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import useUpdateTaskStatus from '@hooks/useUpdateTaskStatus'
import { TaskEntry } from '@shared/task'
import { formatRelative } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import React from 'react'
import { dateFnsLocale } from 'src/locale'
interface Props {
  task: TaskEntry
  showCircle?: boolean
}

export default function TaskItem({ task, showCircle }: Props) {
  const hover = useHoverItemStyle()
  const updateTaskStatus = useUpdateTaskStatus()

  // Toggle done status of a task
  const handleToggleDone = () => {
    updateTaskStatus(task, task.doneDate ? null : Timestamp.now())
  }

  return (
    <LinkBox px={2} py={1} _hover={hover}>
      <HStack>
        <Checkbox
          isChecked={!!task.doneDate}
          onChange={handleToggleDone}
          zIndex={1}
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
