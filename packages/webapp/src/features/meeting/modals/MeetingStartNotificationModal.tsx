import useCurrentMember from '@/member/hooks/useCurrentMember'
import ParticipantsNumber from '@/participants/components/ParticipantsNumber'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  UseModalProps,
  useToast,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { SendIcon } from 'src/icons'
import { MeetingContext } from '../contexts/MeetingContext'

export default function MeetingStartNotificationModal(
  modalProps: UseModalProps
) {
  const { t } = useTranslation()
  const currentMember = useCurrentMember()
  const toast = useToast()
  const { participants, handleSendStartNotification } =
    useContext(MeetingContext)!

  const memberToNotify = participants?.filter(
    (p) => p.member?.userId && p.member.id !== currentMember?.id
  )

  // Send notification to all participants
  const handleSend = () => {
    if (memberToNotify) {
      handleSendStartNotification(participants.map((p) => p.member.id))
    }

    modalProps.onClose()

    // Toast
    toast({
      title: t('MeetingStartNotificationModal.toastSent'),
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  // Don't show modal until we have participants
  if (memberToNotify?.length === 0) {
    return null
  }

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('MeetingStartNotificationModal.heading')}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>{t('MeetingStartNotificationModal.info')}</ModalBody>

        <ModalFooter>
          <Spacer />

          {memberToNotify && (
            <ParticipantsNumber participants={memberToNotify} mr={2} />
          )}

          <Button
            colorScheme="blue"
            rightIcon={<SendIcon variant="Bold" />}
            onClick={handleSend}
          >
            {t(`common.send`)}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
