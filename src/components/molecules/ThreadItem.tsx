import {
  Center,
  Flex,
  forwardRef,
  LinkBox,
  LinkBoxProps,
} from '@chakra-ui/react'
import CircleByIdButton from '@components/atoms/CircleByIdButton'
import ThreadLinkOverlay from '@components/atoms/ThreadLinkOverlay'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { ThreadEntry } from '@shared/thread'
import React from 'react'
import { FiMessageSquare } from 'react-icons/fi'

interface Props extends LinkBoxProps {
  thread: ThreadEntry
  unread?: boolean
  showCircle?: boolean
}

const ThreadItem = forwardRef<Props, 'div'>(
  ({ thread, unread, showCircle, children, ...linkBoxProps }, ref) => {
    const hover = useHoverItemStyle()

    return (
      <LinkBox
        ref={ref}
        p={1}
        _hover={hover}
        {...linkBoxProps}
        tabIndex={
          // Remove tabIndex because it's redondant with link
          undefined
        }
      >
        <Flex>
          <Center w={6} h={6} mr={2}>
            <FiMessageSquare />
          </Center>

          <ThreadLinkOverlay
            thread={thread}
            fontWeight={unread ? 'bold' : 'normal'}
          />

          {showCircle && <CircleByIdButton circleId={thread.circleId} />}

          {children}
        </Flex>
      </LinkBox>
    )
  }
)

ThreadItem.displayName = 'ThreadItem'

export default ThreadItem
