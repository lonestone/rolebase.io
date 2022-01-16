import { Modal } from '@chakra-ui/react'
import { ModalPanel } from '@components/atoms/ModalPanel'
import React from 'react'
import MemberModalContent from '../modals/MemberModalContent'

interface Props {
  id: string
  selectedCircleId?: string
  onClose(): void
}

export default function MemberPanel({ id, selectedCircleId, onClose }: Props) {
  return (
    <Modal isOpen onClose={onClose}>
      <ModalPanel>
        <MemberModalContent id={id} selectedCircleId={selectedCircleId} />
      </ModalPanel>
    </Modal>
  )
}
