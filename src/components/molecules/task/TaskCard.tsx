import CircleByIdButton from '@atoms/CircleByIdButton'
import MemberAvatar from '@atoms/MemberAvatar'
import {
  Avatar,
  Flex,
  forwardRef,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import useDateLocale from '@hooks/useDateLocale'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { usePathInOrg } from '@hooks/usePathInOrg'
import TaskModal from '@organisms/task/TaskModal'
import { TaskEntry } from '@shared/model/task'
import { formatRelative } from 'date-fns'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkBoxProps {
  task: TaskEntry
  showCircle?: boolean
  showMember?: boolean
  isDragging?: boolean
}

const TaskCard = forwardRef<Props, 'div'>(
  (
    { task, showCircle, showMember, isDragging, children, ...linkBoxProps },
    ref
  ) => {
    const dateLocale = useDateLocale()

    const path = usePathInOrg(`tasks/${task.id}`)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleOpen = useNormalClickHandler(onOpen)

    return (
      <>
        <LinkBox
          ref={ref}
          p={1}
          pt={3}
          pl={3}
          bg="white"
          _dark={{
            bg: 'blackAlpha.500',
          }}
          borderRadius="md"
          borderWidth={1}
          boxShadow={isDragging ? 'lg' : 'sm'}
          transition="box-shadow 200ms ease-out"
          _hover={{
            boxShadow: 'md',
          }}
          {...linkBoxProps}
          tabIndex={
            // Remove tabIndex because it's redondant with link
            undefined
          }
        >
          <LinkOverlay as={ReachLink} flex={1} to={path} onClick={handleOpen}>
            {task.title}
          </LinkOverlay>

          <Flex align="center" mt={1}>
            <Spacer />

            {task.dueDate && (
              <Text fontSize="sm" color="gray.500" ml={2}>
                {formatRelative(new Date(task.dueDate), new Date(), {
                  locale: dateLocale,
                })}
              </Text>
            )}

            {showCircle && (
              <CircleByIdButton id={task.circleId} ml={2} size="xs" />
            )}

            {showMember &&
              (task.memberId ? (
                <MemberAvatar id={task.memberId} size="xs" ml={2} />
              ) : (
                <Avatar name="?" size="xs" ml={2} />
              ))}

            {children}
          </Flex>
        </LinkBox>

        {isOpen && <TaskModal id={task.id} isOpen onClose={onClose} />}
      </>
    )
  }
)

TaskCard.displayName = 'TaskCard'

export default TaskCard