import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Button, useDisclosure } from '@chakra-ui/react'
import useOrgMember from '@hooks/useOrgMember'
import useThreads from '@hooks/useThreads'
import ThreadEditModal from '@organisms/thread/ThreadEditModal'
import ThreadsList from '@organisms/thread/ThreadsList'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'

interface Props {
  circleId: string
}

export default function CircleThreads({ circleId }: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()

  // Subscribe to threads
  const { threads, loading, error } = useThreads({ circleId })

  // Thread create modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  return (
    <>
      {isMember && (
        <Button size="sm" mb={4} leftIcon={<FiPlus />} onClick={onCreateOpen}>
          {t('CircleThreads.create')}
        </Button>
      )}

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {threads && <ThreadsList threads={threads} />}

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
