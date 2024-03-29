import Loading from '@/common/atoms/Loading'
import TextErrors from '@/common/atoms/TextErrors'
import MeetingsList from '@/meeting/components/MeetingsList'
import MeetingEditModal from '@/meeting/modals/MeetingEditModal'
import MeetingModal from '@/meeting/modals/MeetingModal'
import MeetingRecurringListModal from '@/meeting/modals/MeetingRecurringListModal'
import useOrgMember from '@/member/hooks/useOrgMember'
import { Button, Flex, Spacer, useDisclosure } from '@chakra-ui/react'
import { useCircleMeetingsSubscription } from '@gql'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateIcon, MeetingRecurringIcon } from 'src/icons'

interface Props {
  circleId: string
}

export default function CircleMeetings({ circleId }: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()

  const { data, error, loading } = useCircleMeetingsSubscription({
    variables: {
      circleId,
    },
  })
  const meetings = data?.meeting

  // Modals
  const [meetingId, setMeetingId] = useState<string | undefined>()
  const meetingModal = useDisclosure()
  const createModal = useDisclosure()
  const recurringModal = useDisclosure()

  const handleCreate = (id: string) => {
    setMeetingId(id)
    meetingModal.onOpen()
  }

  return (
    <>
      <Flex mb={4}>
        {isMember && (
          <Button
            size="sm"
            leftIcon={<CreateIcon size={20} />}
            onClick={createModal.onOpen}
          >
            {t('CircleMeetings.create')}
          </Button>
        )}

        <Spacer />
        <Button
          size="sm"
          variant="outline"
          leftIcon={<MeetingRecurringIcon size={20} />}
          onClick={recurringModal.onOpen}
        >
          {t('CircleMeetings.recurring')}
        </Button>
      </Flex>

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {meetings && <MeetingsList meetings={meetings} />}

      {meetingModal.isOpen && meetingId && (
        <MeetingModal id={meetingId} isOpen onClose={meetingModal.onClose} />
      )}

      {createModal.isOpen && (
        <MeetingEditModal
          defaultCircleId={circleId}
          isOpen
          onClose={createModal.onClose}
          onCreate={handleCreate}
        />
      )}

      {recurringModal.isOpen && (
        <MeetingRecurringListModal
          circleId={circleId}
          isOpen
          onClose={recurringModal.onClose}
        />
      )}
    </>
  )
}
