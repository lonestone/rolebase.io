import CircleButton from '@atoms/CircleButton'
import Loading from '@atoms/Loading'
import ModalCloseStaticButton from '@atoms/ModalCloseStaticButton'
import TextErrors from '@atoms/TextErrors'
import {
  Alert,
  AlertIcon,
  Button,
  FormLabel,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  Spacer,
  useDisclosure,
  UseModalProps,
  Wrap,
} from '@chakra-ui/react'
import { useMeetingRecurringSubscription } from '@gql'
import useCircle from '@hooks/useCircle'
import useCircleParticipants from '@hooks/useCircleParticipants'
import useCreateMeeting from '@hooks/useCreateMeeting'
import useDateLocale from '@hooks/useDateLocale'
import ParticipantsNumber from '@molecules/ParticipantsNumber'
import {
  excludeMeetingsFromRRule,
  getDateFromUTCDate,
} from '@shared/helpers/rrule'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { add, format } from 'date-fns'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { MeetingRecurringIcon } from 'src/icons'
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
  const participants = useCircleParticipants(
    meetingRecurring?.circleId,
    meetingRecurring?.participantsScope,
    meetingRecurring?.participantsMembersIds
  )

  // Next dates
  const nextDates = useMemo(() => {
    if (!meetingRecurring) return

    // Exclude meetings from rrule
    const rrule = excludeMeetingsFromRRule(
      meetingRecurring.rrule,
      meetingRecurring.meetings
    )

    // After and before dates
    const after = new Date()
    const before = new Date()
    before.setFullYear(before.getFullYear() + 1)

    return rrule
      .between(after, before, true, (date, i) => i < 10)
      .map((date) => getDateFromUTCDate(date).toISOString())
  }, [meetingRecurring])

  // Additional date
  const additionalDate = useMemo(() => {
    const dateStr = defaultDate?.toISOString()
    if (!dateStr || nextDates?.includes(dateStr)) return
    return dateStr
  }, [defaultDate, nextDates])

  // Next date select
  const [nextDate, setNextDate] = React.useState<string | undefined>(
    defaultDate?.toISOString()
  )

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
    <Modal size="xl" blockScrollOnMount={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Wrap spacing={2} flex={1} align="center">
            <HStack spacing={2} alignItems="center">
              <MeetingRecurringIcon />
              <Heading as="h1" size="md">
                {t('MeetingHeader.heading', {
                  title: meetingRecurring?.template.title || '…',
                })}
              </Heading>
            </HStack>

            <Spacer />

            <HStack spacing={2}>
              {circle && <CircleButton circle={circle} />}

              {participants && (
                <ParticipantsNumber participants={participants} />
              )}

              <ModalCloseStaticButton />
            </HStack>
          </Wrap>

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
            {(additionalDate
              ? nextDates?.concat(additionalDate)
              : nextDates
            )?.map((date) => (
              <option key={date} value={date}>
                {capitalizeFirstLetter(
                  format(new Date(date), 'PPPP, HH:mm', { locale: dateLocale })
                )}
              </option>
            ))}
          </Select>
        </ModalBody>

        <ModalFooter>
          {loading ? (
            <Loading active size="md" />
          ) : (
            <Button onClick={editModal.onOpen}>
              {t('MeetingRecurringModal.edit')}
            </Button>
          )}

          <Spacer />

          <Button
            colorScheme="blue"
            isDisabled={loading}
            onClick={handleCreate}
          >
            {t('MeetingRecurringModal.create')}
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
