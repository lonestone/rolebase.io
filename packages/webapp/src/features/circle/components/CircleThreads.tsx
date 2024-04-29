import Loading from '@/common/atoms/Loading'
import TextErrors from '@/common/atoms/TextErrors'
import useOrgMember from '@/member/hooks/useOrgMember'
import ThreadsList from '@/thread/components/ThreadsList'
import useThreads from '@/thread/hooks/useThreads'
import ThreadEditModal from '@/thread/modals/ThreadEditModal'
import { Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CreateIcon } from 'src/icons'

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
        <Button
          size="sm"
          mb={4}
          leftIcon={<CreateIcon size={20} />}
          onClick={onCreateOpen}
        >
          {t('CircleThreads.create')}
        </Button>
      )}

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {threads && <ThreadsList threads={threads} showIcon showMember />}

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
