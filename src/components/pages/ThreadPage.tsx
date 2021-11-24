import { subscribeThread } from '@api/entities/threads'
import {
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Tag,
  useDisclosure,
} from '@chakra-ui/react'
import CircleAndParentsButton from '@components/atoms/CircleAndParentsButton'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ThreadActivityCreate from '@components/molecules/ThreadActivityCreate'
import ThreadModal from '@components/organisms/modals/ThreadModal'
import ThreadActivities from '@components/organisms/ThreadActivities'
import useOverflowHidden from '@hooks/useOverflowHidden'
import useSubscription from '@hooks/useSubscription'
import React, { useCallback, useRef, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { useParams } from 'react-router-dom'

interface Params {
  threadId: string
}

enum ScrollPosition {
  None, // Not enough content to scroll
  Top,
  Bottom,
  Middle,
}

export default function ThreadPage() {
  useOverflowHidden()

  const threadId = useParams<Params>().threadId
  const {
    data: thread,
    error,
    loading,
  } = useSubscription(threadId ? subscribeThread(threadId) : undefined)

  // Scroll handling
  const [scrollable, setScrollable] = useState(false)
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>(
    ScrollPosition.Bottom
  )
  const scrollRef = useRef<HTMLDivElement>(null)
  const handleScroll: React.UIEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
      if (scrollTop === 0) {
        setScrollPosition(ScrollPosition.Top)
      } else if (scrollTop + clientHeight < scrollHeight) {
        if (scrollPosition !== ScrollPosition.Middle) {
          setScrollPosition(ScrollPosition.Middle)
        }
      } else {
        setScrollPosition(ScrollPosition.Bottom)
      }
    },
    [scrollPosition]
  )

  // Scroll to end when activities change and scroll position in set to bottom
  const handleActivityUpdate = useCallback(() => {
    const el = scrollRef?.current
    if (el && scrollPosition === ScrollPosition.Bottom) {
      if (el.scrollHeight === el.clientHeight) {
        setScrollable(false)
      } else {
        setScrollable(true)
        el.scrollTop = el.scrollHeight - el.clientHeight
      }
    }
  }, [thread, scrollPosition])

  // Create modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  return (
    <Container maxW="3xl" h="100vh" display="flex" flexDirection="column">
      <Box h="60px" />

      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      {thread && (
        <>
          <HStack mt="30px">
            <Heading as="h2" size="md" display="flex" alignItems="center">
              {thread.title}
              {thread.draft && <Tag ml={2}>Brouillon</Tag>}
              {thread.archived && <Tag ml={2}>Archivé</Tag>}
              <IconButton
                aria-label=""
                icon={<FiEdit3 />}
                size="sm"
                ml={3}
                onClick={onEditOpen}
              />
            </Heading>
            <Spacer />
          </HStack>

          <Box
            pb={1}
            zIndex={1}
            boxShadow={
              scrollable && scrollPosition !== ScrollPosition.Top
                ? '0 6px 11px -10px rgba(0,0,0,0.5)'
                : 'none'
            }
          >
            <CircleAndParentsButton id={thread.circleId} />
          </Box>

          <Box ref={scrollRef} flex={1} overflow="auto" onScroll={handleScroll}>
            <ThreadActivities
              threadId={threadId}
              onUpdate={handleActivityUpdate}
            />
          </Box>

          <Box
            bg="white"
            boxShadow={
              scrollable && scrollPosition !== ScrollPosition.Bottom
                ? '0 -6px 11px -10px rgba(0,0,0,0.5)'
                : 'none'
            }
            zIndex="1"
          >
            <ThreadActivityCreate thread={thread} />
          </Box>

          {isEditOpen && (
            <ThreadModal isOpen thread={thread} onClose={onEditClose} />
          )}
        </>
      )}
    </Container>
  )
}
