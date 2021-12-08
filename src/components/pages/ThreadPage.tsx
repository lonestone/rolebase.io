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
import CircleAndParentsButton from '@components/atoms/CircleAndParentsButton'
import Loading from '@components/atoms/Loading'
import ThreadActivityCreate from '@components/molecules/ThreadActivityCreate'
import ThreadModal from '@components/organisms/modals/ThreadModal'
import ThreadActivities from '@components/organisms/ThreadActivities'
import useOverflowHidden from '@hooks/useOverflowHidden'
import useScrollable from '@hooks/useScrollable'
import useSubscription from '@hooks/useSubscription'
import React from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
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
    <Box h="100vh" pt="40px" display="flex" flexDirection="column">
      {loading && <Loading active center />}

      <Box mt="30px" mx={3}>
        <Flex>
          <Heading as="h2" size="md" display="flex" alignItems="center">
            {thread ? (
              <>
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
              </>
            ) : loading ? (
              <>Chargement...</>
            ) : null}
          </Heading>
          <Spacer />
          {thread && (
            <ParticipantsNumber
              circleId={thread.circleId}
              participantsScope={thread.participantsScope}
              participantsMembersIds={thread.participantsMembersIds}
            />
          )}
        </Flex>

        <Box
          pb={1}
          pl={1}
          zIndex={1}
          boxShadow={
            isScrollable && scrollPosition !== ScrollPosition.Top
              ? '0 6px 11px -10px rgba(0,0,0,0.5)'
              : 'none'
          }
        >
          {thread && <CircleAndParentsButton id={thread.circleId} />}
        </Box>
      </Box>

      <Box ref={containerRef} flex={1} overflow="auto" onScroll={handleScroll}>
        <ThreadActivities ref={contentRef} threadId={threadId} />
      </Box>

      {thread && (
        <Box
          mx={3}
          bg="white"
          boxShadow={
            isScrollable && scrollPosition !== ScrollPosition.Bottom
              ? '0 -6px 11px -10px rgba(0,0,0,0.5)'
              : 'none'
          }
          zIndex="1"
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
