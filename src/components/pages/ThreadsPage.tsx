import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Title } from '@atoms/Title'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  Tag,
  TagCloseButton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Thread_Status_Enum } from '@gql'
import useEntitiesFilterMenu from '@hooks/useEntitiesFilterMenu'
import useFilterEntities from '@hooks/useFilterEntities'
import useOrgMember from '@hooks/useOrgMember'
import useThreads from '@hooks/useThreads'
import ThreadItem from '@molecules/thread/ThreadItem'
import ThreadEditModal from '@organisms/thread/ThreadEditModal'
import { ThreadListSelect } from '@organisms/thread/ThreadListSelect'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'

export default function ThreadsPage() {
  const { t } = useTranslation()
  const isMember = useOrgMember()

  // Circles filter menu
  const {
    filter,
    value: filterValue,
    handleChange: handleFilterChange,
  } = useEntitiesFilterMenu()

  // Archives filter menu
  const [archives, setArchives] = useState(false)

  // Status filter menu
  const [status, setStatus] = useState<Thread_Status_Enum[]>([])

  // Subscribe to threads
  const { threads, error, loading } = useThreads({ archived: archives })

  // Filter threads
  const filteredThreads = useFilterEntities(filter, threads)

  // Create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  return (
    <Box p={5}>
      <Title>{t('ThreadsPage.heading')}</Title>

      <Flex mb={16} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          {t('ThreadsPage.heading')}
        </Heading>

        {archives && (
          <Tag ml={2}>
            {t('common.archives')}
            <TagCloseButton onClick={() => setArchives(false)} />
          </Tag>
        )}

        <Spacer />

        <ThreadListSelect
          filter={filter}
          filterValue={filterValue}
          handleFilterChange={handleFilterChange}
          archives={archives}
          setArchives={setArchives}
          status={status}
          setStatus={setStatus}
        />

        {isMember && (
          <Button
            className="userflow-threads-create"
            size="sm"
            colorScheme="blue"
            ml={2}
            leftIcon={<FiPlus />}
            onClick={onCreateOpen}
          >
            {t('ThreadsPage.create')}
          </Button>
        )}
      </Flex>

      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      <Container maxW="3xl" p={0}>
        {filteredThreads && (
          <VStack spacing={0} align="stretch">
            {filteredThreads.length === 0 && (
              <Text fontStyle="italic">{t('ThreadsPage.empty')}</Text>
            )}

            {filteredThreads.map((thread, i) => (
              <ThreadItem
                key={thread.id}
                className={`userflow-thread-${i}`}
                thread={thread}
                showCircle
                unread={thread.read === false}
              />
            ))}
          </VStack>
        )}
      </Container>

      {isCreateOpen && <ThreadEditModal isOpen onClose={onCreateClose} />}
    </Box>
  )
}
