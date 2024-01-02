import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Button, useDisclosure } from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import useFilterThreadsByMember from '@hooks/useFilterThreadsByMember'
import useOrgMember from '@hooks/useOrgMember'
import useThreads from '@hooks/useThreads'
import DashboardMyInfosItem from '@molecules/dashboard/DashboardMyInfosItem'
import ThreadEditModal from '@organisms/thread/ThreadEditModal'
import ThreadsList from '@organisms/thread/ThreadsList'
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
      {loading && <Loading active center />}
      <TextErrors errors={[error]} />

      {filteredThreads && <ThreadsList threads={filteredThreads} showCircle />}

      {createModal.isOpen && (
        <ThreadEditModal isOpen onClose={createModal.onClose} />
      )}
    </DashboardMyInfosItem>
  )
}
