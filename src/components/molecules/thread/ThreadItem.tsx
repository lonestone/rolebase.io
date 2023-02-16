import CircleByIdButton from '@atoms/CircleByIdButton'
import {
  Center,
  Flex,
  forwardRef,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { ThreadFragment } from '@gql'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import useMember from '@hooks/useMember'
import { usePathInOrg } from '@hooks/usePathInOrg'
import ThreadModal from '@organisms/thread/ThreadModal'
import React from 'react'
import { FiMessageSquare } from 'react-icons/fi'
import { Link as ReachLink } from 'react-router-dom'
import ParticipantsNumber from '@molecules/ParticipantsNumber'

interface Props extends LinkBoxProps {
  thread: ThreadFragment
  unread?: boolean
  showCircle?: boolean
  showIcon?: boolean
  isDragging?: boolean
}

const ThreadItem = forwardRef<Props, 'div'>(
  (
    {
      thread,
      unread,
      showCircle,
      showIcon,
      isDragging,
      children,
      ...linkBoxProps
    },
    ref
  ) => {
    const path = usePathInOrg(`threads/${thread.id}`)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleOpen = useNormalClickHandler(onOpen)
    const hover = useHoverItemStyle()

    // Get thread initiator
    const threadInitiator = useMember(thread.initiatorMemberId)

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
                <FiMessageSquare />
              </Center>
            )}

            <LinkOverlay
              as={ReachLink}
              flex={1}
              to={path}
              fontWeight={unread ? 'bold' : 'normal'}
              onClick={handleOpen}
            >
              {thread.title}
            </LinkOverlay>

            {threadInitiator && (
              <ParticipantsNumber
                participants={[{ member: threadInitiator, circlesIds: [] }]}
                withRightIcon={false}
                marginRight={2}
              />
            )}

            {showCircle && <CircleByIdButton id={thread.circleId} size="xs" />}

            {children}
          </Flex>
        </LinkBox>

        {isOpen && <ThreadModal id={thread.id} isOpen onClose={onClose} />}
      </>
    )
  }
)

ThreadItem.displayName = 'ThreadItem'

export default ThreadItem
