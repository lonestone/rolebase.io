import { subscribeThread } from '@api/entities/threads'
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  IconButton,
  Tag,
  useDisclosure,
} from '@chakra-ui/react'
import CircleButton from '@components/atoms/CircleButton'
import Loading from '@components/atoms/Loading'
import ThreadActivityCreate from '@components/molecules/ThreadActivityCreate'
import ThreadEditModal from '@components/organisms/modals/ThreadEditModal'
import ThreadActivities from '@components/organisms/ThreadActivities'
import Page404 from '@components/pages/Page404'
import useCircle from '@hooks/useCircle'
import useParticipants from '@hooks/useParticipants'
import useScrollable, { ScrollPosition } from '@hooks/useScrollable'
import useSubscription from '@hooks/useSubscription'
import React from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { ThreadContext } from 'src/contexts/ThreadContext'
import ParticipantsNumber from '../atoms/ParticipantsNumber'

interface Props extends BoxProps {
  id: string
}

export default function ThreadContent({ id, ...boxProps }: Props) {
  // Subscribe thread
  const { data: thread, error, loading } = useSubscription(subscribeThread(id))

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
    <Box mx={5} display="flex" flexDirection="column" {...boxProps}>
      {loading && <Loading active center />}

      <Flex
        py={2}
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
                ml={2}
                onClick={onEditOpen}
              />
            </>
          ) : loading ? (
            <>Chargement...</>
          ) : null}
        </Heading>

        {circle && <CircleButton circle={circle} modal ml={5} />}

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
        <ThreadEditModal isOpen thread={thread} onClose={onEditClose} />
      )}
    </Box>
  )
}
