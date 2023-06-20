import MemberLinkOverlay from '@atoms/MemberLinkOverlay'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Box,
  Button,
  Text,
} from '@chakra-ui/react'
import { MeetingSummaryFragment } from '@gql'
import useMatchMeetings from '@hooks/useMatchMeetings'
import { MeetingFormDataValues } from '@organisms/meeting/MeetingEditModal'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  newMeeting?: MeetingFormDataValues
  conflictedMeetings: MeetingSummaryFragment[]
  onAccept: (currentMeeting: MeetingFormDataValues) => void
}

export default function MeetingConfirmModal({
  newMeeting,
  conflictedMeetings,
  onAccept,
  ...alertProps
}: Props) {
  const { t } = useTranslation()
  const cancelRef = useRef<HTMLButtonElement>(null)

  const { matchingParticipants } = useMatchMeetings(
    newMeeting!,
    conflictedMeetings
  )

  useEffect(() => {
    if (matchingParticipants.length === 0) {
      handleCreate()
    }
  }, [matchingParticipants.length])

  const handleCreate = () => {
    onAccept(newMeeting!)
    alertProps.onClose()
  }

  return (
    <AlertDialog {...alertProps} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            {t('MeetingConfirmModal.heading')}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              {t('MeetingConfirmModal.info', {
                count: matchingParticipants.length,
              })}
            </Text>
            <Box px={2} py={1} gap="3">
              {matchingParticipants.map((p) => (
                <MemberLinkOverlay key={p.id} member={p} mt="4" />
              ))}
            </Box>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={alertProps.onClose}>
              {t('common.cancel')}
            </Button>
            <Button colorScheme="red" onClick={handleCreate} ml={3}>
              {t('MeetingConfirmModal.button')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
