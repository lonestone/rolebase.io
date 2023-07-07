import React from 'react'
import DashboardMyInfosItem from '@molecules/dashboard/DashboardMyInfosItem'
import { useTranslation } from 'react-i18next'
import { useDisclosure } from '@chakra-ui/react'
import { EntityFilters } from '@shared/model/participants'
import ThreadEditModal from '@organisms/thread/ThreadEditModal'
import IconTextButton from '@atoms/IconTextButton'
import { FiPlus } from 'react-icons/fi'
import ThreadsList from '@organisms/thread/ThreadsList'

export type DashboardMyThreadsProps = {
  path: string
}

const DashboardMyThreads = ({ path }: DashboardMyThreadsProps) => {
  const { t } = useTranslation()

  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  return (
    <DashboardMyInfosItem
      title={t('DashboardMyThreads.title')}
      path={path}
      actions={
        <IconTextButton
          aria-label={t('DashboardMyThreads.add')}
          icon={<FiPlus />}
          size="sm"
          onClick={onCreateOpen}
        />
      }
    >
      <ThreadsList filter={EntityFilters.Invited} archives={false} />

      {isCreateOpen && <ThreadEditModal isOpen onClose={onCreateClose} />}
    </DashboardMyInfosItem>
  )
}

export default DashboardMyThreads
