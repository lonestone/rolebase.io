import ModalCloseStaticButton from '@atoms/ModalCloseStaticButton'
import ModalMaximizeButton from '@atoms/ModalMaximizeButton'
import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import { usePathInOrg } from '@hooks/usePathInOrg'
import TaskContent from '../task/TaskContent'

interface Props extends UseModalProps {
  id?: string
  defaultCircleId?: string
  defaultMemberId?: string
  defaultTitle?: string
  defaultDescription?: string
  onCreate?(taskId: string): void
}

export default function TaskModal({
  id,
  defaultCircleId,
  defaultMemberId,
  defaultTitle,
  defaultDescription,
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
