import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import ModalMaximizeButton from '@components/atoms/ModalMaximizeButton'
import { usePathInOrg } from '@hooks/usePathInOrg'
import React from 'react'
import ModalCloseStaticButton from '../../atoms/ModalCloseStaticButton'
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
  const path = usePathInOrg(`tasks/${id}`)

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
                <ModalMaximizeButton to={path} />
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
