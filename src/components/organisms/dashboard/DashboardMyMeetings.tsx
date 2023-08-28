import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Button, useDisclosure } from '@chakra-ui/react'
import { useNextMeetingsSubscription } from '@gql'
import useFilterEntities from '@hooks/useFilterEntities'
import { useOrgId } from '@hooks/useOrgId'
import useOrgMember from '@hooks/useOrgMember'
import DashboardMyInfosItem from '@molecules/dashboard/DashboardMyInfosItem'
import MeetingsList from '@molecules/meeting/MeetingsList'
import MeetingEditModal from '@organisms/meeting/MeetingEditModal'
import MeetingModal from '@organisms/meeting/MeetingModal'
import MeetingRecurringListModal from '@organisms/meeting/MeetingRecurringListModal'
import { EntityFilters } from '@shared/model/participants'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateIcon } from 'src/icons'

// Max number of meetings to display
const max = 5

export default function DashboardMyMeetings() {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const isMember = useOrgMember()

  const { data, error, loading } = useNextMeetingsSubscription({
    skip: !orgId,
    variables: {
      orgId: orgId!,
    },
  })

  // Filter meetings
  const meetings = useFilterEntities(EntityFilters.Invited, data?.meeting)

  // Modals
  const [meetingId, setMeetingId] = useState<string | undefined>()
  const meetingModal = useDisclosure()
  const createModal = useDisclosure()
  const recurringListModal = useDisclosure()

  const handleCreated = useCallback((id: string) => {
    setMeetingId(id)
    meetingModal.onOpen()
  }, [])

  return (
    <DashboardMyInfosItem
      title={t('DashboardMyMeetings.title')}
      path="meetings"
      actions={
        isMember && (
          <Button
            size="sm"
            colorScheme="blue"
            leftIcon={<CreateIcon size={20} />}
            onClick={createModal.onOpen}
          >
            {t('DashboardMyMeetings.add')}
          </Button>
        )
      }
    >
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {meetings && (
        <MeetingsList meetings={meetings.slice(0, max)} showCircle />
      )}

      {meetingModal.isOpen && meetingId && (
        <MeetingModal id={meetingId} isOpen onClose={meetingModal.onClose} />
      )}

      {createModal.isOpen && (
        <MeetingEditModal
          isOpen
          onCreate={handleCreated}
          onRecurring={recurringListModal.onOpen}
          onClose={createModal.onClose}
        />
      )}

      {recurringListModal.isOpen && (
        <MeetingRecurringListModal
          isOpen
          onClose={recurringListModal.onClose}
        />
      )}
    </DashboardMyInfosItem>
  )
}
