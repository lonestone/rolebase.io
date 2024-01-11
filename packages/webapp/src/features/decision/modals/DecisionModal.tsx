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
import DecisionContent from '../components/DecisionContent'

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
