import ModalCloseStaticButton from '@/common/atoms/ModalCloseStaticButton'
import ModalMaximizeButton from '@/common/atoms/ModalMaximizeButton'
import { usePathInOrg } from '@/org/hooks/usePathInOrg'
import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import React from 'react'
import TaskContent from '../components/TaskContent'

interface Props extends UseModalProps {
  id?: string
  defaultCircleId?: string
  defaultMemberId?: string
  defaultTitle?: string
  defaultDescription?: string
  defaultPrivate?: boolean
  onCreate?(taskId: string): void
}

export default function TaskModal({
  id,
  defaultCircleId,
  defaultMemberId,
  defaultTitle,
  defaultDescription,
  defaultPrivate,
  onCreate,
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
          defaultTitle={defaultTitle}
          defaultDescription={defaultDescription}
          defaultPrivate={defaultPrivate}
          onCreate={onCreate}
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
