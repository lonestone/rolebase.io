import ModalCloseStaticButton from '@atoms/ModalCloseStaticButton'
import ModalMaximizeButton from '@atoms/ModalMaximizeButton'
import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import { usePathInOrg } from '@hooks/usePathInOrg'
import DecisionContent from './DecisionContent'

interface Props extends UseModalProps {
  id: string
}

export default function DecisionModal({ id, ...modalProps }: Props) {
  const path = usePathInOrg(`decisions/${id}`)

  return (
    <Modal size="xl" autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <DecisionContent
          id={id}
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
