import { Flex, LinkBox, Text } from '@chakra-ui/react'
import CircleByIdButton from '@components/atoms/CircleByIdButton'
import MemberAvatar from '@components/atoms/MemberAvatar'
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
    <LinkBox py={1} _hover={hover}>
      <Flex align="center">
        <TaskStatusInput
          value={task.status}
          onChange={handleChangeStatus}
          zIndex={2}
          mr={2}
        />

        <TaskLinkOverlay task={task} />

        {task.dueDate && (
          <Text fontSize="sm" color="gray.500" ml={2}>
            {formatRelative(task.dueDate.toDate(), new Date(), {
              locale: dateFnsLocale,
            })}
          </Text>
        )}

        <MemberAvatar id={task.memberId} size="xs" ml={2} />

        {showCircle && <CircleByIdButton circleId={task.circleId} ml={2} />}
      </Flex>
    </LinkBox>
  )
}
