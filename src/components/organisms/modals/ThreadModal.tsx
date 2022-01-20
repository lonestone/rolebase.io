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
import ThreadContent from '../ThreadContent'

interface Props extends UseModalProps {
  id: string
}

export default function ThreadModal({ id, ...modalProps }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)

  return (
    <Modal size="3xl" isCentered autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent margin={0}>
        <Link to={`/orgs/${orgId}/threads/${id}`}>
          <ModalMaximizeButton zIndex={2} />
        </Link>
        <ModalCloseButton zIndex={2} />
        <ThreadContent id={id} h="95vh" pt={2} />
      </ModalContent>
    </Modal>
  )
}
