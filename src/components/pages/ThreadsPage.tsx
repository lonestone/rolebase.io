import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  Container,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Spacer,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { Link as ReachLink } from 'react-router-dom'
import { subscribeThreads } from '../../api/entities/threads'
import useSubscription from '../../hooks/useSubscription'
import Loading from '../common/Loading'
import TextErrors from '../common/TextErrors'
import { useStoreState } from '../store/hooks'
import ThreadCreateModal from '../threads/ThreadCreateModal'

export default function ThreadsPage() {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const subscription = useMemo(
    () => (orgId === undefined ? undefined : subscribeThreads(orgId)),
    [orgId]
  )
  const { data, error, loading } = useSubscription(subscription)

  // Create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  return (
    <Container maxW="3xl" marginTop="60px">
      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      <HStack margin="30px 0">
        <Heading as="h2" size="md">
          Discussions
        </Heading>
        <Spacer />
        <Button leftIcon={<AddIcon />} onClick={onCreateOpen}>
          Nouvelle discussion
        </Button>
      </HStack>

      {data && (
        <VStack spacing={0} align="stretch">
          {data.map((thread) => (
            <LinkBox
              key={thread.id}
              p={3}
              borderBottomWidth="1px"
              _hover={{ background: '#fafafa' }}
            >
              <HStack>
                <LinkOverlay
                  as={ReachLink}
                  to={`/orgs/${orgId}/threads/${thread.id}`}
                >
                  {thread.title}
                </LinkOverlay>
                <Spacer />
              </HStack>
            </LinkBox>
          ))}
        </VStack>
      )}

      <ThreadCreateModal isOpen={isCreateOpen} onClose={onCreateClose} />
    </Container>
  )
}
