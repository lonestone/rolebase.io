import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import ModalMaximizeButton from '@components/atoms/ModalMaximizeButton'
import { useStoreState } from '@store/hooks'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
  const orgId = useStoreState((state) => state.orgs.currentId)

  // Selected circle
  const [selectedCircleId, setSelectedCircleId] = useState<string | undefined>(
    defaultSelectedCircleId
  )

  return (
    <Modal size="lg" autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <Link to={`/orgs/${orgId}?memberId=${id}`}>
          <ModalMaximizeButton />
        </Link>
        <MemberModalContent
          id={id}
          selectedCircleId={selectedCircleId}
          onCircleSelect={setSelectedCircleId}
        />
      </ModalContent>
    </Modal>
  )
}
