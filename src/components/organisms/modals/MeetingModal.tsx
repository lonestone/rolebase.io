import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import ModalMaximizeButton from '@components/atoms/ModalMaximizeButton'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { Link } from 'react-router-dom'
import MeetingContent from '../MeetingContent'

interface Props extends UseModalProps {
  id: string
}

export default function MeetingModal({ id, ...modalProps }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)

  return (
    <Modal size="3xl" autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <Link to={`/orgs/${orgId}/meetings/${id}`}>
          <ModalMaximizeButton />
        </Link>
        <ModalCloseButton zIndex={1} />
        <MeetingContent id={id} onClose={modalProps.onClose} px={6} py={4} />
      </ModalContent>
    </Modal>
  )
}
