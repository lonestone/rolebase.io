import CircleByIdButton from '@atoms/CircleByIdButton'
import MemberByIdAvatar from '@atoms/MemberByIdAvatar'
import {
  Center,
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
import useOrgMember from '@hooks/useOrgMember'
import { usePathInOrg } from '@hooks/usePathInOrg'
import useThreadStatus from '@hooks/useThreadStatus'
import ThreadModal from '@organisms/thread/ThreadModal'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'
import ThreadStatusCircle from './ThreadStatusCircle'

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
    const isMember = useOrgMember()

    // Get thread initiator
    const threadInitiator = useMember(thread.initiatorMemberId)

    // Thread status
    const { threadStatus, setStatus } = useThreadStatus(thread)

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
            <Center zIndex="2" mr={2} position="relative">
              <ThreadStatusCircle
                value={threadStatus}
                readOnly={!isMember}
                onChange={setStatus}
              />
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
            </Center>

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
