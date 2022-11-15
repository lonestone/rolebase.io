import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function MeetingOpenCurrent(modalProps: UseModalProps) {
  const { t } = useTranslation()
  const currentMember = useCurrentMember()
  const navigate = useNavigateOrg()

  // Auto-close modal if current member doesn't have a meeting in progress
  useEffect(() => {
    if (modalProps.isOpen && currentMember && !currentMember.meetingId) {
      modalProps.onClose()
    }
  }, [currentMember])

  // Send notification to all participants
  const handleOpen = () => {
    modalProps.onClose()
    navigate(`meetings/${currentMember?.meetingId}`)
  }

  // Display nothing if there is no meeting in progress
  if (!currentMember?.meetingId) {
    return null
  }

  return (
    <Modal size="xs" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('MeetingOpenCurrent.heading')}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>{t('MeetingOpenCurrent.info')}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={handleOpen}>
            {t(`common.open`)}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
