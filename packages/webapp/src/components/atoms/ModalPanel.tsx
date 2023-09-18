import { Box, Modal, ModalProps } from '@chakra-ui/react'
import { SidebarContext } from '@contexts/SidebarContext'
import React, { useContext } from 'react'

export const modalPanelWidth = 450

export default function ModalPanel({ isOpen, children, ...props }: ModalProps) {
  const sidebarContext = useContext(SidebarContext)
  const left = sidebarContext?.width || 0

  return (
    <Modal isOpen={isOpen} {...props}>
      <Box
        position="absolute"
        top={{ base: 0, md: '50%', lg: 0 }}
        bottom={0}
        left={{ base: `${left}px`, lg: 'auto' }}
        right={0}
        w={{ lg: `${modalPanelWidth}px` }}
        overflowY="auto"
        zIndex={1}
        borderLeftWidth={{ lg: '1px' }}
        bg="white"
        _dark={{ bg: 'gray.900' }}
      >
        {children}
      </Box>
    </Modal>
  )
}
