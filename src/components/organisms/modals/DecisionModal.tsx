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
import DecisionContent from '../DecisionContent'

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
