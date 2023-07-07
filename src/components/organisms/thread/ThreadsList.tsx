import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Container, Text, VStack } from '@chakra-ui/react'
import { Thread_Status_Enum } from '@gql'
import useFilterEntities from '@hooks/useFilterEntities'
import useThreads from '@hooks/useThreads'
import ThreadItem from '@molecules/thread/ThreadItem'
import { EntityFilters } from '@shared/model/participants'
import React from 'react'
import { useTranslation } from 'react-i18next'

export type ThreadsListProps = {
  filter: EntityFilters
  archives?: boolean
  status?: Thread_Status_Enum
}
export default function ThreadsList({
  filter,
  archives = false,
  status,
}: ThreadsListProps) {
  const { t } = useTranslation()

  // Subscribe to threads
  const { threads, error, loading } = useThreads({ archived: archives, status })

  // Filter threads
  const filteredThreads = useFilterEntities(filter, threads)

  return (
    <>
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
    </>
  )
}
