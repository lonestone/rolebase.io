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
import TaskContent from '../TaskContent'

interface Props extends UseModalProps {
  id?: string
  defaultCircleId?: string
  defaultMemberId?: string
}

export default function TaskModal({
  id,
  defaultCircleId,
  defaultMemberId,
  ...modalProps
}: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)

  return (
    <Modal size="xl" autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        {id && (
          <Link to={`/orgs/${orgId}/tasks/${id}`}>
            <ModalMaximizeButton />
          </Link>
        )}
        <ModalCloseButton zIndex={1} />
        <TaskContent
          id={id}
          defaultCircleId={defaultCircleId}
          defaultMemberId={defaultMemberId}
          onClose={modalProps.onClose}
          px={6}
          py={4}
        />
      </ModalContent>
    </Modal>
  )
}
