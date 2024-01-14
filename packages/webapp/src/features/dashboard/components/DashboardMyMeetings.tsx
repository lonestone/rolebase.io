import TextErrors from '@/common/atoms/TextErrors'
import DashboardMyInfosItem from '@/dashboard/components/DashboardMyInfosItem'
import MeetingsList from '@/meeting/components/MeetingsList'
import MeetingEditModal from '@/meeting/modals/MeetingEditModal'
import MeetingModal from '@/meeting/modals/MeetingModal'
import MeetingRecurringListModal from '@/meeting/modals/MeetingRecurringListModal'
import useCurrentMember from '@/member/hooks/useCurrentMember'
import useOrgMember from '@/member/hooks/useOrgMember'
import { useOrgId } from '@/org/hooks/useOrgId'
import { Button, useDisclosure } from '@chakra-ui/react'
import { useNextMeetingsSubscription } from '@gql'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateIcon } from 'src/icons'

// Max number of meetings to display
const max = 5

export default function DashboardMyMeetings() {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const isMember = useOrgMember()

  const { data, error, loading } = useNextMeetingsSubscription({
    skip: !orgId || !currentMember,
    variables: {
      orgId: orgId!,
      memberId: currentMember?.id!,
    },
  })
  const meetings = data?.meeting

  // Modals
  const [meetingId, setMeetingId] = useState<string | undefined>()
  const meetingModal = useDisclosure()
  const createModal = useDisclosure()
  const recurringListModal = useDisclosure()

  const handleCreated = useCallback((id: string) => {
    setMeetingId(id)
    meetingModal.onOpen()
  }, [])

  // Don't show card if empty or loading
  if (meetings?.length === 0 || loading || !orgId || !currentMember) return null

  return (
    <DashboardMyInfosItem
      title={t('DashboardMyMeetings.title')}
      path={`meetings?member=${currentMember?.id}`}
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
