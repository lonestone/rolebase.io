import CircleButton from '@atoms/CircleButton'
import Loading from '@atoms/Loading'
import ModalCloseStaticButton from '@atoms/ModalCloseStaticButton'
import TextErrors from '@atoms/TextErrors'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  Spacer,
  useDisclosure,
  UseModalProps,
} from '@chakra-ui/react'
import { useMeetingRecurringSubscription } from '@gql'
import useCircle from '@hooks/useCircle'
import useCreateMeeting from '@hooks/useCreateMeeting'
import useDateLocale from '@hooks/useDateLocale'
import useParticipants from '@hooks/useParticipants'
import ParticipantsNumber from '@molecules/ParticipantsNumber'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { add, format } from 'date-fns'
import React, { useEffect, useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FiCalendar, FiRepeat } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { RRule } from 'rrule'
import MeetingRecurringEditModal from './MeetingRecurringEditModal'

interface Props extends UseModalProps {
  id: string
  defaultDate?: Date
}

export default function MeetingRecurringModal({
  id,
  defaultDate,
  ...modalProps
}: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dateLocale = useDateLocale()
  const createMeeting = useCreateMeeting()

  // Get recurring meeting
  const { data, loading, error } = useMeetingRecurringSubscription({
    variables: { id },
  })

  const meetingRecurring = data?.meeting_recurring_by_pk

  // Circle
  const circle = useCircle(meetingRecurring?.circleId)

  // Participants
  const participants = useParticipants(
    meetingRecurring?.circleId,
    meetingRecurring?.participantsScope,
    meetingRecurring?.participantsMembersIds
  )

  // Next dates
  const nextDates = useMemo(() => {
    if (!meetingRecurring) return
    const rrule = RRule.fromString(meetingRecurring.rrule)
    const after = new Date()
    const before = new Date()
    before.setFullYear(before.getFullYear() + 1)
    return rrule
      .between(after, before, true, (date, i) => i < 10)
      .filter(
        (date) =>
          !meetingRecurring.meetings.some(
            (m) =>
              m.recurringDate &&
              new Date(m.recurringDate).getTime() === date.getTime()
          )
      )
      .map((date) => date.toISOString())
  }, [meetingRecurring])

  // Next date select
  const [nextDate, setNextDate] = React.useState<string | undefined>(
    defaultDate?.toISOString()
  )

  // Set next date to first available if nextDates changes
  useEffect(() => {
    if (!nextDates) return
    if (!nextDate || !nextDates.includes(nextDate)) {
      setNextDate(nextDates[0])
    }
  }, [nextDates])

  const editModal = useDisclosure()

  // Create meeting occurrence
  const handleCreate = async () => {
    if (!meetingRecurring || !nextDate) return
    const result = await createMeeting({
      orgId: meetingRecurring.orgId,
      circleId: meetingRecurring.circleId,
      participantsScope: meetingRecurring.participantsScope,
      participantsMembersIds: meetingRecurring.participantsMembersIds,
      startDate: nextDate,
      endDate: add(new Date(nextDate), {
        minutes: meetingRecurring.duration,
      }).toISOString(),
      title: meetingRecurring.template.title,
      stepsConfig: meetingRecurring.template.stepsConfig,
      videoConf: meetingRecurring.videoConf,
      recurringDate: nextDate,
      recurringId: meetingRecurring.id,
    })
    if (!result) return
    navigate(result.path)
  }

  return (
    <Modal size="xl" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Flex mt={2} mb={4} alignItems="center">
            <Heading as="h1" size="md">
              <Trans
                i18nKey="MeetingContent.heading"
                values={{ title: meetingRecurring?.template.title || '…' }}
                components={{
                  circle: circle ? (
                    <CircleButton circle={circle} mx={1} />
                  ) : (
                    <></>
                  ),
                }}
              />
            </Heading>
            <Box mx={2}>
              <FiRepeat />
            </Box>
            {loading && <Loading active size="md" />}

            <Spacer />

            <Flex mr={-2}>
              {participants && (
                <ParticipantsNumber participants={participants} mr={2} />
              )}

              <ModalCloseStaticButton />
            </Flex>
          </Flex>

          <TextErrors errors={[error]} />

          <Alert status="info" my={10}>
            <AlertIcon />
            {t('MeetingRecurringModal.info')}
          </Alert>

          <FormLabel>{t('MeetingRecurringModal.createLabel')}</FormLabel>
          <Select
            value={nextDate}
            onChange={(e) => setNextDate(e.target.value)}
          >
            {nextDates?.map((date) => (
              <option key={date} value={date}>
                {capitalizeFirstLetter(
                  format(new Date(date), 'PPPP, HH:mm', { locale: dateLocale })
                )}
              </option>
            ))}
          </Select>
        </ModalBody>

        <ModalFooter>
          <Button onClick={editModal.onOpen}>
            {t(`MeetingRecurringModal.edit`)}
          </Button>

          <Spacer />

          <Button
            colorScheme="blue"
            leftIcon={<FiCalendar />}
            onClick={handleCreate}
          >
            {t(`common.create`)}
          </Button>
        </ModalFooter>
      </ModalContent>

      {editModal.isOpen && (
        <MeetingRecurringEditModal
          isOpen
          meetingRecurring={meetingRecurring ?? undefined}
          onClose={editModal.onClose}
        />
      )}
    </Modal>
  )
}
