import {
  Avatar,
  Center,
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
import TaskModal from '@components/organisms/task/TaskModal'
import useDateLocale from '@hooks/useDateLocale'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { usePathInOrg } from '@hooks/usePathInOrg'
import useUpdateTaskStatus from '@hooks/useUpdateTaskStatus'
import { TaskEntry, TaskStatus } from '@shared/model/task'
import { formatRelative } from 'date-fns'
import React from 'react'
import { FiCheckSquare } from 'react-icons/fi'
import { Link as ReachLink } from 'react-router-dom'
import TaskStatusInput from './TaskStatusInput'

interface Props extends LinkBoxProps {
  task: TaskEntry
  showCircle?: boolean
  showMember?: boolean
  showIcon?: boolean
  isDragging?: boolean
}

const TaskItem = forwardRef<Props, 'div'>(
  (
    {
      task,
      showCircle,
      showMember,
      showIcon,
      isDragging,
      children,
      ...linkBoxProps
    },
    ref
  ) => {
    const hover = useHoverItemStyle()
    const updateTaskStatus = useUpdateTaskStatus()
    const dateLocale = useDateLocale()

    const handleChangeStatus = (status: TaskStatus) => {
      updateTaskStatus(task, status)
    }

    const path = usePathInOrg(`tasks/${task.id}`)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleOpen = useNormalClickHandler(onOpen)

    return (
      <>
        <LinkBox
          ref={ref}
          p={1}
          boxShadow={isDragging ? 'lg' : 'none'}
          _hover={hover}
          {...linkBoxProps}
          tabIndex={
            // Remove tabIndex because it's redondant with link
            undefined
          }
        >
          <Flex align="center">
            {showIcon && (
              <Center w={6} h={6} mr={2}>
                <FiCheckSquare />
              </Center>
            )}

            <LinkOverlay as={ReachLink} flex={1} to={path} onClick={handleOpen}>
              {task.title}
            </LinkOverlay>

            {task.dueDate && (
              <Text fontSize="sm" color="gray.500" ml={2}>
                {formatRelative(task.dueDate.toDate(), new Date(), {
                  locale: dateLocale,
                })}
              </Text>
            )}

            {showCircle && (
              <CircleByIdButton id={task.circleId} size="xs" ml={2} />
            )}

            {showMember &&
              (task.memberId ? (
                <MemberAvatar id={task.memberId} size="xs" ml={2} />
              ) : (
                <Avatar name="?" size="xs" ml={2} />
              ))}

            <TaskStatusInput
              value={task.status}
              onChange={handleChangeStatus}
              zIndex={2}
              ml={2}
            />

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
