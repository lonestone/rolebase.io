import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import React from 'react'
import ThreadPageContent from '../ThreadPageContent'

interface Props extends UseModalProps {
  id: string
}

export default function ThreadModal({ id, ...modalProps }: Props) {
  return (
    <Modal size="3xl" isCentered autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent margin={0}>
        <ModalCloseButton zIndex={1} />
        <ThreadPageContent id={id} h="95vh" />
      </ModalContent>
    </Modal>
  )
}
