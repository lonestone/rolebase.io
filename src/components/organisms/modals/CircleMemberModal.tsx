import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import ModalMaximizeButton from '@components/atoms/ModalMaximizeButton'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { useOrgId } from '@hooks/useOrgId'
import React from 'react'
import CircleContent from '../CircleContent'
import MemberContent from '../MemberContent'

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
  const orgId = useOrgId()
  const handleClose = useNormalClickHandler(modalProps.onClose, true)

  if (!circleId && !memberId) return null

  return (
    <Modal size="lg" autoFocus={false} {...modalProps}>
      <ModalOverlay />

      <ModalContent>
        {memberId ? (
          <MemberContent
            id={memberId}
            selectedCircleId={circleId}
            headerIcons={
              <ModalMaximizeButton
                to={`/orgs/${orgId}?memberId=${memberId}${
                  circleId ? `&circleId=${circleId}` : ''
                }`}
                onClick={handleClose}
              />
            }
          />
        ) : (
          circleId && (
            <CircleContent
              id={circleId}
              headerIcons={
                <ModalMaximizeButton
                  to={`/orgs/${orgId}?circleId=${circleId}`}
                  onClick={handleClose}
                />
              }
            />
          )
        )}
      </ModalContent>
    </Modal>
  )
}
