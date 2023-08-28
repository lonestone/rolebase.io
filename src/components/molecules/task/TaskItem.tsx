import CircleByIdButton from '@atoms/CircleByIdButton'
import MemberByIdAvatar from '@atoms/MemberByIdAvatar'
import TaskStatusTag from '@atoms/TaskStatusTag'
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
import { Task_Status_Enum, TaskFragment } from '@gql'
import useDateLocale from '@hooks/useDateLocale'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import useOrgMember from '@hooks/useOrgMember'
import { usePathInOrg } from '@hooks/usePathInOrg'
import useUpdateTaskStatus from '@hooks/useUpdateTaskStatus'
import TaskModal from '@organisms/task/TaskModal'
import { formatRelative } from 'date-fns'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'
import { TaskIcon } from 'src/icons'
import TaskStatusInput from './TaskStatusInput'

interface Props extends LinkBoxProps {
  task: TaskFragment
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
    const isMember = useOrgMember()
    const hover = useHoverItemStyle()
    const updateTaskStatus = useUpdateTaskStatus()
    const dateLocale = useDateLocale()

    const handleChangeStatus = (status: Task_Status_Enum) => {
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
          bg={isDragging ? 'gray.100' : undefined}
          _dark={
            isDragging ? { bg: isDragging ? 'gray.700' : undefined } : undefined
          }
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
                <TaskIcon />
              </Center>
            )}

            <LinkOverlay as={ReachLink} flex={1} to={path} onClick={handleOpen}>
              {task.title}
            </LinkOverlay>

            {task.dueDate && (
              <Text
                fontSize="sm"
                color="gray.500"
                _dark={{ color: 'gray.300' }}
                ml={2}
              >
                {formatRelative(new Date(task.dueDate), new Date(), {
                  locale: dateLocale,
                })}
              </Text>
            )}

            {showCircle && (
              <CircleByIdButton id={task.circleId} size="xs" ml={2} />
            )}

            {showMember &&
              (task.memberId ? (
                <MemberByIdAvatar id={task.memberId} size="xs" ml={2} />
              ) : (
                <Avatar name="?" size="xs" ml={2} />
              ))}

            {isMember ? (
              <TaskStatusInput
                value={task.status}
                onChange={handleChangeStatus}
                zIndex={2}
                ml={2}
              />
            ) : (
              <TaskStatusTag status={task.status} ml={2} />
            )}

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
