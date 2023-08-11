import BounceAnimation from '@atoms/BounceAnimation'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  BoxProps,
  Button,
  Link,
  Spacer,
} from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { useUpdateMeetingMutation } from '@gql'
import useDateLocale from '@hooks/useDateLocale'
import { format } from 'date-fns'
import React, { useCallback, useContext } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FiEdit3, FiPlay } from 'react-icons/fi'

interface Props extends BoxProps {
  onStart: () => void
  onEdit: () => void
}

export default function MeetingAlertNotStarted({
  onStart,
  onEdit,
  ...boxProps
}: Props) {
  const { t } = useTranslation()
  const dateLocale = useDateLocale()

  const { meeting, isToday, isStartTimePassed, handleNextStep } =
    useContext(MeetingContext)!

  // Meeting archiving
  const [updateMeeting] = useUpdateMeetingMutation()
  const handleArchive = () => {
    if (!meeting) return
    updateMeeting({
      variables: { id: meeting.id, values: { archived: true } },
    })
  }

  // Start meeting
  const handleStart = useCallback(() => {
    handleNextStep()
    onStart()
  }, [meeting, handleNextStep])

  if (!meeting) return null

  const startDateLocale = format(new Date(meeting.startDate), 'PPPP', {
    locale: dateLocale,
  })

  return isToday ? (
    <BounceAnimation active={isStartTimePassed} {...boxProps}>
      <Button leftIcon={<FiPlay />} colorScheme="green" onClick={handleStart}>
        {t('MeetingAlertNotStarted.start')}
      </Button>
    </BounceAnimation>
  ) : (
    <Alert status="info" {...boxProps}>
      <AlertIcon />

      <AlertDescription>
        <Trans
          i18nKey={
            isStartTimePassed
              ? 'MeetingAlertNotStarted.past'
              : 'MeetingAlertNotStarted.future'
          }
          values={{
            date: startDateLocale,
          }}
          components={{
            date: <Link href="#" textDecoration="underline" onClick={onEdit} />,
          }}
        />
      </AlertDescription>

      {isStartTimePassed && (
        <>
          <Spacer />
          <Button
            variant="outline"
            colorScheme="red"
            onClick={handleArchive}
            mr={2}
          >
            {t('common.archive')}
          </Button>
          <Button leftIcon={<FiEdit3 />} colorScheme="blue" onClick={onEdit}>
            {t('common.edit')}
          </Button>
        </>
      )}
    </Alert>
  )
}
