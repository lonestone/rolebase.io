import { subscribeMeetingsByCircle } from '@api/entities/meetings'
import { Button, Text, useDisclosure } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import MeetingEditModal from '@components/organisms/meeting/MeetingEditModal'
import MeetingModal from '@components/organisms/meeting/MeetingModal'
import useDateLocale from '@hooks/useDateLocale'
import { useOrgId } from '@hooks/useOrgId'
import useOrgMember from '@hooks/useOrgMember'
import useSubscription from '@hooks/useSubscription'
import { format, isSameDay } from 'date-fns'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'
import { capitalizeFirstLetter } from 'src/utils'
import MeetingItem from './MeetingItem'

interface Props {
  circleId: string
}

export default function CircleMeetings({ circleId }: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const orgId = useOrgId()
  const dateLocale = useDateLocale()

  const {
    data: meetings,
    error,
    loading,
  } = useSubscription(
    orgId ? subscribeMeetingsByCircle(orgId, circleId) : undefined
  )

  // Meeting modal
  const [meetingId, setMeetingId] = useState<string | undefined>()
  const {
    isOpen: isMeetingOpen,
    onOpen: onMeetingOpen,
    onClose: onMeetingClose,
  } = useDisclosure()

  // Create Meeting modal
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  const handleCreate = (id: string) => {
    setMeetingId(id)
    onMeetingOpen()
  }

  return (
    <>
      {isMember && (
        <Button size="sm" mb={4} leftIcon={<FiPlus />} onClick={onCreateOpen}>
          {t('CircleMeetings.create')}
        </Button>
      )}

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {meetings?.length === 0 && (
        <Text fontStyle="italic">{t('CircleMeetings.empty')}</Text>
      )}

      {meetings?.map((meeting, i) => {
        const date = meeting.startDate.toDate()
        return (
          <React.Fragment key={meeting.id}>
            {(i === 0 ||
              !isSameDay(date, meetings[i - 1].startDate.toDate())) && (
              <Text mt={2} px={2} fontSize="sm">
                {capitalizeFirstLetter(
                  format(date, 'PPPP', {
                    locale: dateLocale,
                  })
                )}
              </Text>
            )}

            <MeetingItem meeting={meeting} showTime pl={2} />
          </React.Fragment>
        )
      })}

      {isMeetingOpen && meetingId && (
        <MeetingModal id={meetingId} isOpen onClose={onMeetingClose} />
      )}

      {isCreateOpen && (
        <MeetingEditModal
          defaultCircleId={circleId}
          isOpen
          onClose={onCreateClose}
          onCreate={handleCreate}
        />
      )}
    </>
  )
}
