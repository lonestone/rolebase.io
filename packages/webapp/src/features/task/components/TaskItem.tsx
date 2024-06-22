import CircleByIdButton from '@/circle/components/CircleByIdButton'
import useDateLocale from '@/common/hooks/useDateLocale'
import { useHoverItemStyle } from '@/common/hooks/useHoverItemStyle'
import { useNormalClickHandler } from '@/common/hooks/useNormalClickHandler'
import MemberByIdAvatar from '@/member/components/MemberByIdAvatar'
import useOrgMember from '@/member/hooks/useOrgMember'
import { usePathInOrg } from '@/org/hooks/usePathInOrg'
import {
  Avatar,
  Center,
  forwardRef,
  HStack,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Task_Status_Enum, TaskFragment } from '@gql'
import { formatRelative } from 'date-fns'
import React from 'react'
import { Link as ReachLink, useLocation } from 'react-router-dom'
import { PrivacyIcon, TaskIcon } from 'src/icons'
import useUpdateTaskStatus from '../hooks/useUpdateTaskStatus'
import TaskModal from '../modals/TaskModal'
import TaskStatusInput from './TaskStatusInput'
import TaskStatusTag from './TaskStatusTag'

interface Props extends LinkBoxProps {
  task: TaskFragment
  noModal?: boolean
  showCircle?: boolean
  showMember?: boolean
  showIcon?: boolean
  showDueDate?: boolean
  isDragging?: boolean
}

const TaskItem = forwardRef<Props, 'div'>(
  (
    {
      task,
      noModal,
      showCircle,
      showMember,
      showIcon,
      showDueDate,
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

    // Is active?
    const location = useLocation()
    const isActive = location.pathname === path

    return (
      <>
        <LinkBox
          ref={ref}
          p={1}
          boxShadow={isDragging ? 'lg' : 'none'}
          bg={isDragging ? 'gray.50' : undefined}
          _dark={{ bg: isDragging ? 'gray.700' : undefined }}
          _hover={hover}
          {...linkBoxProps}
          tabIndex={
            // Remove tabIndex because it's redondant with link
            undefined
          }
          className={isActive ? 'active' : undefined}
        >
          <HStack align="center">
            {showIcon && (
              <Center w={6} h={6}>
                <TaskIcon />
              </Center>
            )}

            <LinkOverlay
              as={ReachLink}
              to={path}
              flex={1}
              w="0"
              display="block"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              onClick={noModal ? undefined : handleOpen}
            >
              {task.title}
            </LinkOverlay>

            {showDueDate && task.dueDate && (
              <Text
                fontSize="sm"
                color="gray.500"
                _dark={{ color: 'gray.300' }}
              >
                {formatRelative(new Date(task.dueDate), new Date(), {
                  locale: dateLocale,
                })}
              </Text>
            )}

            {task?.private && <PrivacyIcon size={18} />}

            {showCircle && <CircleByIdButton id={task.circleId} size="xs" />}

            {showMember &&
              (task.memberId ? (
                <MemberByIdAvatar id={task.memberId} size="xs" />
              ) : (
                <Avatar name="?" size="xs" />
              ))}

            {isMember ? (
              <TaskStatusInput
                value={task.status}
                onChange={handleChangeStatus}
                zIndex={2}
              />
            ) : (
              <TaskStatusTag status={task.status} />
            )}

            {children}
          </HStack>
        </LinkBox>

        {isOpen && <TaskModal id={task.id} isOpen onClose={onClose} />}
      </>
    )
  }
)

TaskItem.displayName = 'TaskItem'

export default TaskItem
