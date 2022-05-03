import { subscribeThreadsByCircle } from '@api/entities/threads'
import { Button, Text, useDisclosure } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ThreadEditModal from '@components/organisms/modals/ThreadEditModal'
import { useOrgId } from '@hooks/useOrgId'
import useSubscription from '@hooks/useSubscription'
import useThreadsWithStatus from '@hooks/useThreadsWithStatus'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'
import ThreadItem from './ThreadItem'

interface Props {
  circleId: string
}

export default function ThreadsInCircleList({ circleId }: Props) {
  const { t } = useTranslation()
  const orgId = useOrgId()

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

  return (
    <>
      <Button size="sm" mb={4} leftIcon={<FiPlus />} onClick={onCreateOpen}>
        {t('molecules.ThreadsInCircleList.heading')}
      </Button>

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {threads?.length === 0 && (
        <Text>{t('molecules.ThreadsInCircleList.empty')}</Text>
      )}

      {threads?.map((thread) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          unread={thread.read === false}
        />
      ))}

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
