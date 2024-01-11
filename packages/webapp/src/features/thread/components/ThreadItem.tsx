import CircleByIdButton from '@/circle/components/CircleByIdButton'
import { useHoverItemStyle } from '@/common/hooks/useHoverItemStyle'
import { useNormalClickHandler } from '@/common/hooks/useNormalClickHandler'
import MemberByIdAvatar from '@/member/components/MemberByIdAvatar'
import useMember from '@/member/hooks/useMember'
import useOrgMember from '@/member/hooks/useOrgMember'
import { usePathInOrg } from '@/org/hooks/usePathInOrg'
import {
  Center,
  Circle,
  forwardRef,
  HStack,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  TypographyProps,
  useDisclosure,
} from '@chakra-ui/react'
import { ThreadFragment } from '@gql'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'
import { PrivacyIcon } from 'src/icons'
import useThreadStatus from '../hooks/useThreadStatus'
import ThreadModal from '../modals/ThreadModal'
import ThreadStatusIcon from './ThreadStatusIcon'

interface Props extends LinkBoxProps {
  thread: ThreadFragment
  unread?: boolean
  showCircle?: boolean
  showMember?: boolean
  isDragging?: boolean
  labelProps?: TypographyProps
}

const ThreadItem = forwardRef<Props, 'div'>(
  (
    {
      thread,
      unread,
      showCircle,
      showMember,
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
          <HStack align="center">
            <Center zIndex="2" position="relative">
              <ThreadStatusIcon
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

            {thread?.private && <PrivacyIcon size={20} />}

            {showMember && threadInitiator && (
              <MemberByIdAvatar
                id={threadInitiator.id}
                circleId={thread.circleId}
                w={6}
                h={6}
                size="xs"
              />
            )}

            {showCircle && <CircleByIdButton id={thread.circleId} size="xs" />}

            {children}
          </HStack>
        </LinkBox>

        {isOpen && <ThreadModal id={thread.id} isOpen onClose={onClose} />}
      </>
    )
  }
)

ThreadItem.displayName = 'ThreadItem'

export default ThreadItem
