import {
  Center,
  Modal,
  ModalBody,
  ModalBodyProps,
  ModalContent,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react'
import React from 'react'
import BrandLogo from './BrandLogo'
import ModalBackButton from './ModalBackButton'

interface Props extends ModalProps {
  size: ModalProps['size']
  bodyProps?: ModalBodyProps
  children: React.ReactNode
}

export default function BrandModal({
  size,
  bodyProps,
  children,
  ...modalProps
}: Props) {
  return (
    <Modal size={size} closeOnOverlayClick={false} {...modalProps}>
      <ModalOverlay bg="menulight" _dark={{ bg: 'menudark' }} />

      <ModalContent my="115px">
        <ModalBackButton />

        <Center w="100%" textAlign="center" position="absolute" top="-70px">
          <BrandLogo size="md" />
        </Center>

        <ModalBody mx={5} my={10} {...bodyProps}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
