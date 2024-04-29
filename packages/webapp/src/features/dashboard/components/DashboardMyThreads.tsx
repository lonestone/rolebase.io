import TextErrors from '@/common/atoms/TextErrors'
import DashboardMyInfosItem from '@/dashboard/components/DashboardMyInfosItem'
import useCurrentMember from '@/member/hooks/useCurrentMember'
import useOrgMember from '@/member/hooks/useOrgMember'
import ThreadsList from '@/thread/components/ThreadsList'
import useFilterThreadsByMember from '@/thread/hooks/useFilterThreadsByMember'
import useThreads from '@/thread/hooks/useThreads'
import ThreadEditModal from '@/thread/modals/ThreadEditModal'
import { Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CreateIcon } from 'src/icons'

export default function DashboardMyThreads() {
  const { t } = useTranslation()
  const createModal = useDisclosure()
  const isMember = useOrgMember()
  const currentMember = useCurrentMember()

  // Subscribe to threads
  const { threads, error, loading } = useThreads()

  // Filter threads
  const filteredThreads = useFilterThreadsByMember(threads, currentMember?.id)

  // Don't show card if empty or loading
  if (threads?.length === 0 || loading) return null

  return (
    <DashboardMyInfosItem
      title={t('DashboardMyThreads.title')}
      path={`threads?member=${currentMember?.id}`}
      actions={
        isMember && (
          <Button
            size="sm"
            colorScheme="blue"
            leftIcon={<CreateIcon size={20} />}
            onClick={createModal.onOpen}
          >
            {t('DashboardMyThreads.add')}
          </Button>
        )
      }
    >
      <TextErrors errors={[error]} />

      {filteredThreads && (
        <ThreadsList threads={filteredThreads} showIcon showCircle showMember />
      )}

      {createModal.isOpen && (
        <ThreadEditModal isOpen onClose={createModal.onClose} />
      )}
    </DashboardMyInfosItem>
  )
}
