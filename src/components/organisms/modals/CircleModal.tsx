import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import React from 'react'
import CircleModalContent from './CircleModalContent'

interface Props extends UseModalProps {
  id: string
}

export default function CircleModal({ id, ...modalProps }: Props) {
  return (
    <Modal size="lg" autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <CircleModalContent id={id} />
      </ModalContent>
    </Modal>
  )
}
