import CircleByIdButton from '@atoms/CircleByIdButton'
import MemberByIdAvatar from '@atoms/MemberByIdAvatar'
import {
  Box,
  Circle,
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
import { CircleThreadStatus } from '@molecules/CircleThreadStatus'
import ThreadModal from '@organisms/thread/ThreadModal'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkBoxProps {
  thread: ThreadFragment
  unread?: boolean
  showCircle?: boolean
  isDragging?: boolean
  labelProps?: TypographyProps
}

const ThreadItem = forwardRef<Props, 'div'>(
  (
    {
      thread,
      unread,
      showCircle,
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
            // Remove tabIndex because it's redundant with link
            undefined
          }
        >
          <Flex align="center">
            <Box zIndex="2" mr={2} position="relative">
              <CircleThreadStatus status={thread.status} />
              {unread && (
                <Circle
                  size="8px"
                  position="absolute"
                  top="-1px"
                  right="-1px"
                  bg="red.400"
                  _dark={{ bg: 'red.600' }}
                />
              )}
            </Box>

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
