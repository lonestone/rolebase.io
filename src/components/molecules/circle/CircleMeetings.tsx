import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Button, Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import { useSubscribeCircleMeetingsSubscription } from '@gql'
import useDateLocale from '@hooks/useDateLocale'
import useOrgMember from '@hooks/useOrgMember'
import MeetingEditModal from '@organisms/meeting/MeetingEditModal'
import MeetingModal from '@organisms/meeting/MeetingModal'
import MeetingRecurringListModal from '@organisms/meeting/MeetingRecurringListModal'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { format, isSameMonth } from 'date-fns'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus, FiRepeat } from 'react-icons/fi'
import MeetingItem from '../meeting/MeetingItem'

interface Props {
  circleId: string
}

export default function CircleMeetings({ circleId }: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const dateLocale = useDateLocale()

  const { data, error, loading } = useSubscribeCircleMeetingsSubscription({
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
          <Button size="sm" leftIcon={<FiPlus />} onClick={createModal.onOpen}>
            {t('CircleMeetings.create')}
          </Button>
        )}

        <Spacer />
        <Button
          size="sm"
          variant="outline"
          leftIcon={<FiRepeat />}
          onClick={recurringModal.onOpen}
        >
          {t('CircleMeetings.recurring')}
        </Button>
      </Flex>

      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      {meetings?.length === 0 && (
        <Text fontStyle="italic">{t('CircleMeetings.empty')}</Text>
      )}

      {meetings?.map((meeting, i) => {
        const date = new Date(meeting.startDate)
        return (
          <React.Fragment key={meeting.id}>
            {(i === 0 ||
              !isSameMonth(date, new Date(meetings[i - 1].startDate))) && (
              <Text mt={3} px={2} fontSize="sm">
                {capitalizeFirstLetter(
                  format(date, 'LLLL y', {
                    locale: dateLocale,
                  })
                )}
              </Text>
            )}

            <MeetingItem meeting={meeting} showDay showTime pl={2} />
          </React.Fragment>
        )
      })}

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
