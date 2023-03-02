import CircleByIdButton from '@atoms/CircleByIdButton'
import MemberByIdAvatar from '@atoms/MemberByIdAvatar'
import {
  Center,
  Flex,
  forwardRef,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  TypographyProps,
  useDisclosure,
} from '@chakra-ui/react'
import { ThreadFragment } from '@gql'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import useMember from '@hooks/useMember'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { usePathInOrg } from '@hooks/usePathInOrg'
import ThreadModal from '@organisms/thread/ThreadModal'
import React from 'react'
import { FiMessageSquare } from 'react-icons/fi'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkBoxProps {
  thread: ThreadFragment
  unread?: boolean
  showCircle?: boolean
  showIcon?: boolean
  isDragging?: boolean
  labelProps?: TypographyProps
}

const ThreadItem = forwardRef<Props, 'div'>(
  (
    {
      thread,
      unread,
      showCircle,
      showIcon,
      isDragging,
      labelProps,
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
                <FiMessageSquare />
              </Center>
            )}

            <LinkOverlay
              as={ReachLink}
              flex={1}
              to={path}
              fontWeight={unread ? 'bold' : undefined}
              {...labelProps}
              onClick={handleOpen}
            >
              {thread.title}
            </LinkOverlay>

            {threadInitiator && (
              <MemberByIdAvatar
                id={threadInitiator.id}
                circleId={thread.circleId}
                w={6}
                h={6}
                mr={2}
                size="xs"
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
