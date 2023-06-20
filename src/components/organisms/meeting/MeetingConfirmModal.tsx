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
import useMatchMeetings, { CreatedMeeting } from '@hooks/useMatchMeetings'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  meeting?: CreatedMeeting
}

export default function MeetingConfirmModal({ meeting, ...alertProps }: Props) {
  const { t } = useTranslation()
  const cancelRef = useRef<HTMLButtonElement>(null)

  const { matchingParticipants } = useMatchMeetings({
    currentMeeting: meeting!,
  })

  console.log({ matchingParticipants })

  const handleCreate = () => {
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
            <Box mt="8" px={2} py={1}>
              {matchingParticipants.map((p) => (
                <MemberLinkOverlay key={p.id} member={p} />
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
