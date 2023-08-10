import BrandIcon from '@atoms/BrandIcon'
import ModalBackButton from '@atoms/ModalBackButton'
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
      <ModalOverlay bg="gray.100" _dark={{ bg: 'gray.800' }} />

      <ModalContent my="115px">
        <ModalBackButton />

        <Center w="100%" textAlign="center" position="absolute" top="-70px">
          <BrandIcon size="md" />
        </Center>

        <ModalBody mx={5} my={10} {...bodyProps}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
