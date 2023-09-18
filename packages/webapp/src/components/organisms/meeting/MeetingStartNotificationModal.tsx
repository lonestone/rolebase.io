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
import { MeetingContext } from '@contexts/MeetingContext'
import useCurrentMember from '@hooks/useCurrentMember'
import ParticipantsNumber from '@molecules/ParticipantsNumber'
import { ParticipantMember } from '@shared/model/member'
import { useStoreState } from '@store/hooks'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { SendIcon } from 'src/icons'

export default function MeetingStartNotificationModal(
  modalProps: UseModalProps
) {
  const { t } = useTranslation()
  const currentMember = useCurrentMember()
  const toast = useToast()
  const members = useStoreState((state) => state.org.members)
  const { meeting, handleSendStartNotification } = useContext(MeetingContext)!

  const participants =
    currentMember &&
    members &&
    (meeting?.attendees
      ?.map(({ memberId }) => ({
        member: members.find((m) => m.id === memberId),
        circlesIds: [],
      }))
      .filter((p) => p.member?.userId && p.member.id !== currentMember.id) as
      | ParticipantMember[]
      | undefined)

  // Send notification to all participants
  const handleSend = () => {
    if (participants) {
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
  if (participants?.length === 0) {
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

          {participants && (
            <ParticipantsNumber participants={participants} mr={2} />
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
