import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import ModalMaximizeButton from '@components/atoms/ModalMaximizeButton'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { usePathInOrg } from '@hooks/usePathInOrg'
import React from 'react'
import MemberContent from '../member/MemberContent'
import CircleContent from './CircleContent'

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
  const handleClose = useNormalClickHandler(modalProps.onClose, true)
  const path = usePathInOrg('')

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
                to={`${path}?memberId=${memberId}${
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
              isFirstTabOpen
              headerIcons={
                <ModalMaximizeButton
                  to={`${path}?circleId=${circleId}`}
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
