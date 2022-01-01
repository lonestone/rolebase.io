import { Modal } from '@chakra-ui/react'
import { ModalPanel } from '@components/atoms/ModalPanel'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import React, { useCallback } from 'react'
import MemberModalContent from '../modals/MemberModalContent'

interface Props {
  id: string
  selectedCircleId?: string
  onClose(): void
}

export default function MemberPanel({ id, selectedCircleId, onClose }: Props) {
  // Go to circle panel
  const navigateOrg = useNavigateOrg()
  const handleCircleChange = useCallback(
    (circleId: string | undefined) => {
      if (circleId) {
        navigateOrg(`?circleId=${circleId}&memberId=${id}`)
      } else {
        navigateOrg(`?memberId=${id}`)
      }
    },
    [id]
  )

  return (
    <Modal isOpen onClose={onClose}>
      <ModalPanel>
        <MemberModalContent
          id={id}
          selectedCircleId={selectedCircleId}
          onCircleSelect={handleCircleChange}
        />
      </ModalPanel>
    </Modal>
  )
}
