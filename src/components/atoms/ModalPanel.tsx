import { Modal, ModalProps } from '@chakra-ui/react'
import { SidebarContext } from '@contexts/SidebarContext'
import React, { useContext } from 'react'
import GlassBox from './GlassBox'

export const modalPanelWidth = 450

export default function ModalPanel({ isOpen, children, ...props }: ModalProps) {
  const sidebarContext = useContext(SidebarContext)

  return (
    <Modal isOpen={isOpen} {...props}>
      <GlassBox
        position="absolute"
        bottom={0}
        right={0}
        w={`${modalPanelWidth}px`}
        maxW="100vw"
        h={sidebarContext?.height ? undefined : '100vh'}
        maxH={`calc(100vh - ${sidebarContext?.height || 0}px)`}
        overflow="auto"
        zIndex={1}
        borderLeftWidth={sidebarContext?.height ? 0 : '1px'}
        borderTopWidth={sidebarContext?.height ? '1px' : 0}
      >
        {children}
      </GlassBox>
    </Modal>
  )
}
