import { subscribeThreadsByCircle } from '@api/entities/threads'
import {
  Button,
  HStack,
  LinkBox,
  LinkOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ThreadEditModal from '@components/organisms/modals/ThreadEditModal'
import ThreadModal from '@components/organisms/modals/ThreadModal'
import useSubscription from '@hooks/useSubscription'
import useThreadsWithStatus from '@hooks/useThreadsWithStatus'
import { useStoreState } from '@store/hooks'
import React, { MouseEvent, useCallback, useState } from 'react'
import { FiMessageSquare, FiPlus } from 'react-icons/fi'
import { Link as ReachLink } from 'react-router-dom'

interface Props {
  circleId: string
}

export default function ThreadsInCircleList({ circleId }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)

  // Subscribe to threads
  const { data, error, loading } = useSubscription(
    orgId ? subscribeThreadsByCircle(orgId, circleId, false) : undefined
  )

  // Enrich with status and sort
  const threads = useThreadsWithStatus(data)

  // Thread create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  // Thread modal
  const [threadId, setThreadId] = useState<string | undefined>()
  const {
    isOpen: isThreadOpen,
    onOpen: onThreadOpen,
    onClose: onThreadClose,
  } = useDisclosure()

  const handleOpen = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const id = event.currentTarget.getAttribute('data-id')
    if (id) {
      setThreadId(id)
      onThreadOpen()
    }
  }, [])

  return (
    <>
      <Button size="sm" mb={4} leftIcon={<FiPlus />} onClick={onCreateOpen}>
        Créer une discussion
      </Button>

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {threads && (
        <VStack spacing={0} align="stretch">
          {threads.length === 0 && <i>Aucune discussion pour le moment</i>}

          {threads.map((thread) => (
            <LinkBox
              key={thread.id}
              px={2}
              py={1}
              _hover={{ background: '#fafafa' }}
            >
              <HStack spacing={3} align="stretch" alignItems="center">
                <FiMessageSquare />
                <LinkOverlay
                  as={ReachLink}
                  to={`/orgs/${orgId}/threads/${thread.id}`}
                  data-id={thread.id}
                  onClick={handleOpen}
                  fontWeight={thread.read !== false ? 'normal' : 'bold'}
                >
                  {thread.title}
                </LinkOverlay>
              </HStack>
            </LinkBox>
          ))}
        </VStack>
      )}

      {isThreadOpen && threadId && (
        <ThreadModal id={threadId} isOpen onClose={onThreadClose} />
      )}

      {isCreateOpen && (
        <ThreadEditModal
          defaultCircleId={circleId}
          isOpen
          onClose={onCreateClose}
        />
      )}
    </>
  )
}
