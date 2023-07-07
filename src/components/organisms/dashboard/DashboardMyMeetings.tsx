import React, { useCallback, useState } from 'react'
import DashboardMyInfosItem from '@molecules/dashboard/DashboardMyInfosItem'
import { useTranslation } from 'react-i18next'
import IconTextButton from '@atoms/IconTextButton'
import { FiPlus } from 'react-icons/fi'
import MeetingEditModal from '@organisms/meeting/MeetingEditModal'
import { useDisclosure } from '@chakra-ui/react'
import MeetingRecurringListModal from '@organisms/meeting/MeetingRecurringListModal'
import MeetingModal from '@organisms/meeting/MeetingModal'

export type DashboardMyMeetingsProps = {
  path: string
}

const DashboardMyMeetings = ({ path }: DashboardMyMeetingsProps) => {
  const { t } = useTranslation()

  // Meeting id for modal
  const [meetingId, setMeetingId] = useState<string | undefined>()

  // Dates for meeting creation modal
  const [startDate, setStartDate] = useState<Date | undefined>()

  const {
    isOpen: isMeetingModalOpen,
    onOpen: onMeetingModalOpen,
    onClose: onMeetingModalClose,
  } = useDisclosure()

  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure()

  const {
    isOpen: isRecurringListModalOpen,
    onOpen: onRecurringListModalOpen,
    onClose: onRecurringListModalClose,
  } = useDisclosure()

  // Handlers
  const handleCreate = useCallback(() => {
    setStartDate(undefined)
    onCreateModalOpen()
  }, [])

  const handleCreated = useCallback((id: string) => {
    setMeetingId(id)
    onMeetingModalOpen()
  }, [])

  return (
    <DashboardMyInfosItem
      title={t('DashboardMyMeetings.title')}
      path={path}
      actions={
        <IconTextButton
          aria-label={t('DashboardMyMeetings.add')}
          icon={<FiPlus />}
          size="sm"
          onClick={handleCreate}
        />
      }
    >
      {isMeetingModalOpen && meetingId && (
        <MeetingModal id={meetingId} isOpen onClose={onMeetingModalClose} />
      )}

      {isCreateModalOpen && (
        <MeetingEditModal
          defaultStartDate={startDate}
          defaultDuration={30}
          isOpen
          onCreate={handleCreated}
          onRecurring={onRecurringListModalOpen}
          onClose={onCreateModalClose}
        />
      )}

      {isRecurringListModalOpen && (
        <MeetingRecurringListModal isOpen onClose={onRecurringListModalClose} />
      )}
    </DashboardMyInfosItem>
  )
}

export default DashboardMyMeetings
