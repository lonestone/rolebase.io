import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import MemberModalContent from './MemberModalContent'

interface Props extends UseModalProps {
  id: string
  defaultSelectedCircleId?: string
}

export default function MemberModal({
  id,
  defaultSelectedCircleId,
  ...modalProps
}: Props) {
  // Selected circle
  const [selectedCircleId, setSelectedCircleId] = useState<string | undefined>(
    defaultSelectedCircleId
  )

  return (
    <Modal size="lg" autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <MemberModalContent
          id={id}
          selectedCircleId={selectedCircleId}
          onCircleSelect={setSelectedCircleId}
        />
      </ModalContent>
    </Modal>
  )
}
