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
import ThreadModal from '@components/organisms/modals/ThreadModal'
import { CirclesFilters } from '@shared/circle'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { FiMessageSquare, FiPlus } from 'react-icons/fi'
import { Link as ReachLink } from 'react-router-dom'
import useThreadsList from '../../hooks/useThreadsList'

interface Props {
  circleId: string
}

export default function ThreadsInCircleList({ circleId }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)

  // Subscribe to threads
  const { threads, error, loading } = useThreadsList(
    CirclesFilters.Circle,
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
      <Button size="sm" mb={4} leftIcon={<FiPlus />} onClick={onThreadOpen}>
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
              borderBottomWidth="1px"
              _hover={{ background: '#fafafa' }}
            >
              <HStack spacing={3} align="stretch" alignItems="center">
                <FiMessageSquare />
                <LinkOverlay
                  as={ReachLink}
                  to={`/orgs/${orgId}/threads/${thread.id}`}
                  fontWeight={thread.read ? 'normal' : 'bold'}
                >
                  {thread.title}
                </LinkOverlay>
              </HStack>
            </LinkBox>
          ))}
        </VStack>
      )}

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
