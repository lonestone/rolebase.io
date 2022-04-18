import { Flex, forwardRef, LinkBox, LinkBoxProps, Text } from '@chakra-ui/react'
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

interface Props extends LinkBoxProps {
  task: TaskEntry
  showCircle?: boolean
}

const TaskItem = forwardRef<Props, 'div'>(
  ({ task, showCircle, children, ...linkBoxProps }, ref) => {
    const hover = useHoverItemStyle()
    const updateTaskStatus = useUpdateTaskStatus()

    const handleChangeStatus = (status: TaskStatus) => {
      updateTaskStatus(task, status)
    }

    return (
      <LinkBox
        ref={ref}
        p={1}
        _hover={hover}
        {...linkBoxProps}
        tabIndex={
          // Remove tabIndex because it's redondant with link
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

          {task.dueDate && (
            <Text fontSize="sm" color="gray.500" ml={2}>
              {formatRelative(task.dueDate.toDate(), new Date(), {
                locale: dateFnsLocale,
              })}
            </Text>
          )}

          <MemberAvatar id={task.memberId} size="xs" ml={2} />

          {showCircle && <CircleByIdButton circleId={task.circleId} ml={2} />}

          {children}
        </Flex>
      </LinkBox>
    )
  }
)

TaskItem.displayName = 'TaskItem'

export default TaskItem
