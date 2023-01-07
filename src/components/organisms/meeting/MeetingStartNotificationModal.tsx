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
import ParticipantsNumber from '@components/molecules/ParticipantsNumber'
import useCurrentMember from '@hooks/useCurrentMember'
import { ParticipantMember } from '@shared/model/member'
import { useStoreState } from '@store/hooks'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdSend } from 'react-icons/io'
import { MeetingContext } from 'src/contexts/MeetingContext'

export default function MeetingStartNotificationModal(
  modalProps: UseModalProps
) {
  const { t } = useTranslation()
  const currentMember = useCurrentMember()
  const toast = useToast()
  const members = useStoreState((state) => state.members.entries)
  const { meeting, handleSendStartNotification } = useContext(MeetingContext)!

  const participants =
    currentMember &&
    members &&
    (meeting?.attendees
      ?.map(({ memberId }) => ({
        member: members.find((m) => m.id === memberId),
        circlesIds: [],
      }))
      .filter((p) => p.member && p.member.id !== currentMember.id) as
      | ParticipantMember[]
      | undefined)

  // Send notification to all participants
  const handleSend = () => {
    handleSendStartNotification()
    modalProps.onClose()

    // Toast
    toast({
      title: t('MeetingStartNotificationModal.toastSent'),
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
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
            rightIcon={<IoMdSend />}
            onClick={handleSend}
          >
            {t(`common.send`)}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
