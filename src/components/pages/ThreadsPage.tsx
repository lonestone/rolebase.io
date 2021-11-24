import { subscribeThreads } from '@api/entities/threads'
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
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ThreadModal from '@components/organisms/modals/ThreadModal'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import useSubscription from '@hooks/useSubscription'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'

export default function ThreadsPage() {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const navigateOrg = useNavigateOrg()

  const { data, error, loading } = useSubscription(
    orgId ? subscribeThreads(orgId) : undefined
  )

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

      <ThreadModal
        isOpen={isCreateOpen}
        onClose={onCreateClose}
        onCreate={(id: string) => navigateOrg(`/threads/${id}`)}
      />
    </Container>
  )
}
