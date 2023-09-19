import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Button, useDisclosure } from '@chakra-ui/react'
import useFilterEntities from '@hooks/useFilterEntities'
import useOrgMember from '@hooks/useOrgMember'
import useThreads from '@hooks/useThreads'
import DashboardMyInfosItem from '@molecules/dashboard/DashboardMyInfosItem'
import ThreadEditModal from '@organisms/thread/ThreadEditModal'
import ThreadsList from '@organisms/thread/ThreadsList'
import { EntityFilters } from '@shared/model/participants'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CreateIcon } from 'src/icons'

export default function DashboardMyThreads() {
  const { t } = useTranslation()
  const createModal = useDisclosure()
  const isMember = useOrgMember()

  // Subscribe to threads
  const { threads, error, loading } = useThreads()

  // Filter threads
  const filteredThreads = useFilterEntities(EntityFilters.Invited, threads)

  return (
    <DashboardMyInfosItem
      title={t('DashboardMyThreads.title')}
      path="threads"
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