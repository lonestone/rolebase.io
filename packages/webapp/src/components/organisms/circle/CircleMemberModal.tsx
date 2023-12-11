import ModalMaximizeButton from '@atoms/ModalMaximizeButton'
import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import { CircleProvider } from '@contexts/CIrcleContext'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { usePathInOrg } from '@hooks/usePathInOrg'
import React from 'react'
import CircleContent from '../../molecules/circle/CircleContent'
import MemberContent from '../member/MemberContent'

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
  const path = usePathInOrg('roles')

  if (!circleId && !memberId) return null

  return (
    <Modal size="lg" autoFocus={false} {...modalProps}>
      <ModalOverlay />

      <ModalContent borderRadius="lg" overflow="hidden">
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
            <CircleProvider circleId={circleId}>
              <CircleContent
                headerIcons={
                  <ModalMaximizeButton
                    to={`${path}?circleId=${circleId}`}
                    onClick={handleClose}
                  />
                }
              />
            </CircleProvider>
          )
        )}
      </ModalContent>
    </Modal>
  )
}
