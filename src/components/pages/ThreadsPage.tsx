import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  Container,
  Heading,
  HStack,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { subscribeThreads } from '../../api/entities/threads'
import useSubscription from '../../hooks/useSubscription'
import Loading from '../common/Loading'
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

      <HStack margin="30px 0">
        <Heading as="h2" size="md">
          Discussions
        </Heading>
        <Spacer />
        <Button leftIcon={<AddIcon />} onClick={onCreateOpen}>
          Nouvelle discussion
        </Button>
      </HStack>

      <ThreadCreateModal isOpen={isCreateOpen} onClose={onCreateClose} />
    </Container>
  )
}
