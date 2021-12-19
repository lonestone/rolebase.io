import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  LinkBox,
  LinkOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ThreadModal from '@components/organisms/modals/ThreadModal'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'
import useThreadsList, { ThreadsFilter } from '../../hooks/useThreadsList'

interface Props {
  circleId: string
}

export default function ThreadsInCircleList({ circleId }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)

  // Subscribe to threads
  const { threads, error, loading } = useThreadsList(
    ThreadsFilter.Circle,
    false,
    circleId
  )

  // Thread modal
  const {
    isOpen: isThreadOpen,
    onOpen: onThreadOpen,
    onClose: onThreadClose,
  } = useDisclosure()

  return (
    <>
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
              borderBottomWidth="1px"
              _hover={{ background: '#fafafa' }}
            >
              <LinkOverlay
                as={ReachLink}
                to={`/orgs/${orgId}/threads/${thread.id}`}
                fontWeight={thread.read ? 'normal' : 'bold'}
              >
                {thread.title}
              </LinkOverlay>
            </LinkBox>
          ))}
        </VStack>
      )}

      <Button size="sm" mt={2} leftIcon={<AddIcon />} onClick={onThreadOpen}>
        Ajouter une discussion
      </Button>

      {isThreadOpen && (
        <ThreadModal
          defaultCircleId={circleId}
          isOpen
          onClose={onThreadClose}
        />
      )}
    </>
  )
}
