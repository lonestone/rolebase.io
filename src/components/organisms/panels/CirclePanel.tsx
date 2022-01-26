import { Modal } from '@chakra-ui/react'
import { ModalPanel } from '@components/atoms/ModalPanel'
import React from 'react'
import CircleModalContent from '../modals/CircleModalContent'

interface Props {
  id: string
  onClose(): void
}

export default function CirclePanel({ id, onClose }: Props) {
  return (
    <Modal isOpen onClose={onClose}>
      <ModalPanel>
        <CircleModalContent id={id} changeTitle />
      </ModalPanel>
    </Modal>
  )
}
