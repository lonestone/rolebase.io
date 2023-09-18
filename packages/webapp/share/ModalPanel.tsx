import GlassBox from '@atoms/GlassBox'
import { Modal, ModalProps } from '@chakra-ui/react'
import React from 'react'

export const modalPanelWidth = 300

export default function ModalPanel({ isOpen, children, ...props }: ModalProps) {
  return (
    <Modal isOpen={isOpen} {...props}>
      <GlassBox
        position="absolute"
        top={3}
        right={3}
        w="300px"
        maxW="100vw"
        maxH={`calc(100vh - 10px)`}
        overflowY="auto"
        zIndex={1}
        borderRadius="lg"
        shadow="md"
      >
        {children}
      </GlassBox>
    </Modal>
  )
}
