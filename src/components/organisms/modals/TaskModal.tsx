import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import ModalMaximizeButton from '@components/atoms/ModalMaximizeButton'
import { useOrgId } from '@hooks/useOrgId'
import React from 'react'
import TaskContent from '../TaskContent'
import ModalCloseStaticButton from './ModalCloseStaticButton'

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
  const orgId = useOrgId()

  return (
    <Modal size="xl" autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <TaskContent
          id={id}
          defaultCircleId={defaultCircleId}
          defaultMemberId={defaultMemberId}
          headerIcons={
            id && (
              <>
                <ModalMaximizeButton to={`/orgs/${orgId}/tasks/${id}`} />
                <ModalCloseStaticButton />
              </>
            )
          }
          onClose={modalProps.onClose}
          px={6}
          py={4}
        />
      </ModalContent>
    </Modal>
  )
}
