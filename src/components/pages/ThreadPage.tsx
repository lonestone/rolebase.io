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
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ThreadActivityCreate from '@components/molecules/ThreadActivityCreate'
import ThreadEditModal from '@components/organisms/modals/ThreadEditModal'
import ThreadActivities from '@components/organisms/ThreadActivities'
import useOverflowHidden from '@hooks/useOverflowHidden'
import useSubscription from '@hooks/useSubscription'
import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'

interface Params {
  threadId: string
}

export default function ThreadPage() {
  useOverflowHidden()

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
    <Container maxW="3xl" h="100vh" display="flex" flexDirection="column">
      <Box h="60px" />

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

          <Box flex={1} overflow="scroll">
            <ThreadActivities threadId={threadId} />
          </Box>

          <Box bg="white">
            <ThreadActivityCreate threadId={thread.id} />
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
