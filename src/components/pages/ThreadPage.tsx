import { subscribeThread } from '@api/entities/threads'
import { EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Spacer,
  Tag,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ThreadActivityCreate from '@components/molecules/ThreadActivityCreate'
import ThreadEditModal from '@components/organisms/modals/ThreadEditModal'
import useSubscription from '@hooks/useSubscription'
import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'

interface Params {
  threadId: string
}

export default function ThreadPage() {
  const threadId = useParams<Params>().threadId
  const subscription = useMemo(
    () => (threadId === undefined ? undefined : subscribeThread(threadId)),
    [threadId]
  )
  const { data: thread, error, loading } = useSubscription(subscription)

  // Create modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  return (
    <Container maxW="3xl" marginTop="60px">
      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      {thread && (
        <>
          <HStack margin="30px 0">
            <Heading as="h2" size="md">
              {thread.title}
              {thread.draft && <Tag ml={2}>Brouillon</Tag>}
              {thread.archived && <Tag ml={2}>Archivé</Tag>}
            </Heading>
            <Spacer />
            <Button leftIcon={<EditIcon />} onClick={onEditOpen}>
              Modifier
            </Button>
          </HStack>

          <VStack spacing={2} align="stretch"></VStack>

          <Spacer h="50px" />

          <Box position="fixed" zIndex={9} bottom={0} left={0} right={0}>
            <Container maxW="3xl">
              <ThreadActivityCreate threadId={thread.id} />
            </Container>
          </Box>

          <ThreadEditModal
            thread={thread}
            isOpen={isEditOpen}
            onClose={onEditClose}
          />
        </>
      )}
    </Container>
  )
}
