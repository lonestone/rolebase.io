import { useNavigateOrg } from '@/org/hooks/useNavigateOrg'
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
import { useStoreState } from '@store/hooks'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function MeetingOpenCurrent(modalProps: UseModalProps) {
  const { t } = useTranslation()
  const currentMeetingId = useStoreState(
    (state) => state.memberStatus.currentMeetingId
  )
  const navigate = useNavigateOrg()

  // Close modal if current member doesn't have a meeting in progress
  // so that it doesn't show up again
  useEffect(() => {
    if (modalProps.isOpen && currentMeetingId === null) {
      modalProps.onClose()
    }
  }, [currentMeetingId])

  // Open meeting
  const handleOpen = () => {
    navigate(`meetings/${currentMeetingId}`)
  }

  // Display nothing if there is no meeting in progress
  if (!currentMeetingId) {
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
