import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import ModalMaximizeButton from '@components/atoms/ModalMaximizeButton'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { Link } from 'react-router-dom'
import CircleModalContent from './CircleModalContent'
import MemberModalContent from './MemberModalContent'

interface Props extends UseModalProps {
  circleId?: string
  memberId?: string
}

// Modal that show either a circle or a member with a selected circle
export default function CircleMemberModal({
  circleId,
  memberId,
  ...modalProps
}: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const handleClose = useNormalClickHandler(modalProps.onClose, true)

  if (!circleId && !memberId) return null

  return (
    <Modal size="lg" autoFocus={false} {...modalProps}>
      <ModalOverlay />

      {memberId ? (
        <ModalContent>
          <Link
            to={`/orgs/${orgId}?memberId=${memberId}${
              circleId ? `&circleId=${circleId}` : ''
            }`}
            onClick={handleClose}
          >
            <ModalMaximizeButton />
          </Link>
          <MemberModalContent id={memberId} selectedCircleId={circleId} />
        </ModalContent>
      ) : (
        circleId && (
          <ModalContent>
            <Link
              to={`/orgs/${orgId}?circleId=${circleId}`}
              onClick={handleClose}
            >
              <ModalMaximizeButton />
            </Link>
            <CircleModalContent id={circleId} />
          </ModalContent>
        )
      )}
    </Modal>
  )
}