import {
  Flex,
  forwardRef,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import CircleByIdButton from '@components/atoms/CircleByIdButton'
import MemberAvatar from '@components/atoms/MemberAvatar'
import TaskModal from '@components/organisms/modals/TaskModal'
import useDateLocale from '@hooks/useDateLocale'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { useOrgId } from '@hooks/useOrgId'
import useUpdateTaskStatus from '@hooks/useUpdateTaskStatus'
import { TaskEntry, TaskStatus } from '@shared/task'
import { formatRelative } from 'date-fns'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'
import TaskStatusInput from './TaskStatusInput'

interface Props extends LinkBoxProps {
  task: TaskEntry
  showCircle?: boolean
}

const TaskItem = forwardRef<Props, 'div'>(
  ({ task, showCircle, children, ...linkBoxProps }, ref) => {
    const orgId = useOrgId()
    const hover = useHoverItemStyle()
    const updateTaskStatus = useUpdateTaskStatus()
    const dateLocale = useDateLocale()

    const handleChangeStatus = (status: TaskStatus) => {
      updateTaskStatus(task, status)
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleOpen = useNormalClickHandler(onOpen)

    return (
      <>
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
          <Flex align="center">
            <TaskStatusInput
              value={task.status}
              onChange={handleChangeStatus}
              zIndex={2}
              mr={2}
            />

            <LinkOverlay
              as={ReachLink}
              flex={1}
              to={`/orgs/${orgId}/tasks/${task.id}`}
              onClick={handleOpen}
            >
              {task.title}
            </LinkOverlay>

            {task.dueDate && (
              <Text fontSize="sm" color="gray.500" ml={2}>
                {formatRelative(task.dueDate.toDate(), new Date(), {
                  locale: dateLocale,
                })}
              </Text>
            )}

            <MemberAvatar id={task.memberId} size="xs" ml={2} />

            {showCircle && <CircleByIdButton circleId={task.circleId} ml={2} />}

            {children}
          </Flex>
        </LinkBox>

        {isOpen && <TaskModal id={task.id} isOpen onClose={onClose} />}
      </>
    )
  }
)

TaskItem.displayName = 'TaskItem'

export default TaskItem
