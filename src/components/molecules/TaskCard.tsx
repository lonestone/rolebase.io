import {
  Avatar,
  Flex,
  forwardRef,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Spacer,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import CircleByIdButton from '@components/atoms/CircleByIdButton'
import MemberAvatar from '@components/atoms/MemberAvatar'
import TaskModal from '@components/organisms/modals/TaskModal'
import useDateLocale from '@hooks/useDateLocale'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { useOrgId } from '@hooks/useOrgId'
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
    const orgId = useOrgId()
    const dateLocale = useDateLocale()
    const { colorMode } = useColorMode()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleOpen = useNormalClickHandler(onOpen)

    return (
      <>
        <LinkBox
          ref={ref}
          p={1}
          pt={3}
          pl={3}
          bg={colorMode === 'light' ? 'white' : 'gray.700'}
          borderRadius="md"
          boxShadow={isDragging ? 'lg' : 'none'}
          _hover={{
            boxShadow: 'md',
          }}
          {...linkBoxProps}
          tabIndex={
            // Remove tabIndex because it's redondant with link
            undefined
          }
        >
          <LinkOverlay
            as={ReachLink}
            flex={1}
            to={`/orgs/${orgId}/tasks/${task.id}`}
            onClick={handleOpen}
          >
            {task.title}
          </LinkOverlay>

          <Flex align="center" mt={1}>
            <Spacer />

            {task.dueDate && (
              <Text fontSize="sm" color="gray.500" ml={2}>
                {formatRelative(task.dueDate.toDate(), new Date(), {
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
