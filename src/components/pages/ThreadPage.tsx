import { subscribeThread } from '@api/entities/threads'
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Tag,
  useDisclosure,
} from '@chakra-ui/react'
import CircleButton from '@components/atoms/CircleButton'
import Loading from '@components/atoms/Loading'
import ThreadActivityCreate from '@components/molecules/ThreadActivityCreate'
import ThreadModal from '@components/organisms/modals/ThreadModal'
import ThreadActivities from '@components/organisms/ThreadActivities'
import useCircle from '@hooks/useCircle'
import useOverflowHidden from '@hooks/useOverflowHidden'
import useParticipants from '@hooks/useParticipants'
import useScrollable from '@hooks/useScrollable'
import useSubscription from '@hooks/useSubscription'
import React from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { ThreadContext } from 'src/contexts/ThreadContext'
import ParticipantsNumber from '../atoms/ParticipantsNumber'
import Page404 from './Page404'

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

  // Circle
  const circle = useCircle(thread?.circleId)

  // Participants
  const participants = useParticipants(
    thread?.circleId,
    thread?.participantsScope,
    thread?.participantsMembersIds
  )

  // Scrollable content
  const {
    containerRef,
    contentRef,
    isScrollable,
    scrollPosition,
    handleScroll,
  } = useScrollable()

  // Create modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  if (error) {
    return <Page404 />
  }

  return (
    <Box h="100vh" mx={5} pt="70px" display="flex" flexDirection="column">
      {loading && <Loading active center />}

      <Flex
        pb={2}
        position="relative"
        zIndex={0}
        boxShadow={
          isScrollable && scrollPosition !== ScrollPosition.Top
            ? '0 6px 11px -10px rgba(0,0,0,0.5)'
            : 'none'
        }
      >
        <Heading as="h1" size="md" display="flex" alignItems="center">
          {thread ? (
            <>
              {thread.title}
              {thread.archived && <Tag ml={2}>Archivé</Tag>}
              <IconButton
                aria-label=""
                icon={<FiEdit3 />}
                variant="ghost"
                size="sm"
                ml={3}
                onClick={onEditOpen}
              />
            </>
          ) : loading ? (
            <>Chargement...</>
          ) : null}
        </Heading>
        <Spacer />
        {circle && <CircleButton circle={circle} modal />}
        <ParticipantsNumber participants={participants} ml={1} />
      </Flex>

      <Box ref={containerRef} flex={1} overflow="auto" onScroll={handleScroll}>
        <ThreadContext.Provider value={thread}>
          <ThreadActivities ref={contentRef} />
        </ThreadContext.Provider>
      </Box>

      {thread && (
        <Box
          bg="white"
          position="relative"
          zIndex={0}
          boxShadow={
            isScrollable && scrollPosition !== ScrollPosition.Bottom
              ? '0 -6px 11px -10px rgba(0,0,0,0.5)'
              : 'none'
          }
        >
          <ThreadActivityCreate thread={thread} />
        </Box>
      )}

      {isEditOpen && (
        <ThreadModal isOpen thread={thread} onClose={onEditClose} />
      )}
    </Box>
  )
}
