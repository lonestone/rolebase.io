import {
  Center,
  Flex,
  forwardRef,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import CircleByIdButton from '@components/atoms/CircleByIdButton'
import ThreadModal from '@components/organisms/thread/ThreadModal'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { usePathInOrg } from '@hooks/usePathInOrg'
import { ThreadEntry } from '@shared/model/thread'
import React from 'react'
import { FiMessageSquare } from 'react-icons/fi'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkBoxProps {
  thread: ThreadEntry
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
