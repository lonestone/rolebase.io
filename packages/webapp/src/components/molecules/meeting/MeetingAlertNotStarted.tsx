import BounceAnimation from '@atoms/BounceAnimation'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  BoxProps,
  Button,
  HStack,
  Link,
  Spacer,
} from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { useUpdateMeetingMutation } from '@gql'
import useDateLocale from '@hooks/useDateLocale'
import { format } from 'date-fns'
import React, { useCallback, useContext } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { EditIcon, PlayIcon, VisioIcon } from 'src/icons'

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

  const { meeting, isToday, isStartTimePassed, videoConfUrl, handleNextStep } =
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
    <HStack spacing={5} {...boxProps}>
      <BounceAnimation active={isStartTimePassed}>
        <Button
          leftIcon={<PlayIcon variant="Bold" />}
          colorScheme="green"
          onClick={handleStart}
        >
          {t('MeetingAlertNotStarted.start')}
        </Button>
      </BounceAnimation>

      {videoConfUrl && (
        <a href={videoConfUrl} target="_blank" rel="noreferrer">
          <Button
            leftIcon={<VisioIcon variant="Bold" />}
            variant="ghost"
            colorScheme="blue"
          >
            {t('MeetingContent.videoConf')}
          </Button>
        </a>
      )}
    </HStack>
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
            {t('common.delete')}
          </Button>
          <Button
            leftIcon={<EditIcon size={18} />}
            colorScheme="blue"
            onClick={onEdit}
          >
            {t('common.edit')}
          </Button>
        </>
      )}
    </Alert>
  )
}
