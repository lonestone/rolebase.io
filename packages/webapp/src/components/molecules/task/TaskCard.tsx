import CircleByIdButton from '@atoms/CircleByIdButton'
import MemberByIdAvatar from '@atoms/MemberByIdAvatar'
import {
  Avatar,
  forwardRef,
  HStack,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { TaskFragment } from '@gql'
import useDateLocale from '@hooks/useDateLocale'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { usePathInOrg } from '@hooks/usePathInOrg'
import TaskModal from '@organisms/task/TaskModal'
import { formatRelative } from 'date-fns'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'
import { PrivacyIcon } from 'src/icons'

interface Props extends LinkBoxProps {
  task: TaskFragment
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

          <HStack align="center" justifyContent="end" mt={1}>
            {task.dueDate && (
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

            {task?.private && <PrivacyIcon size={20} />}

            {showCircle && <CircleByIdButton id={task.circleId} size="xs" />}

            {showMember &&
              (task.memberId ? (
                <MemberByIdAvatar id={task.memberId} size="xs" />
              ) : (
                <Avatar name="?" size="xs" />
              ))}

            {children}
          </HStack>
        </LinkBox>

        {isOpen && <TaskModal id={task.id} isOpen onClose={onClose} />}
      </>
    )
  }
)

TaskCard.displayName = 'TaskCard'

export default TaskCard
