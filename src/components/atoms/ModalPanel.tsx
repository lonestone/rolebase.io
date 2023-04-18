import { Modal, ModalProps } from '@chakra-ui/react'
import { SidebarContext } from '@contexts/SidebarContext'
import { useContext } from 'react'
import GlassBox from './GlassBox'

export const modalPanelWidth = 450

export default function ModalPanel({ isOpen, children, ...props }: ModalProps) {
  const sidebarContext = useContext(SidebarContext)
  const top = sidebarContext?.height || 0

  return (
    <Modal isOpen={isOpen} {...props}>
      <GlassBox
        position="absolute"
        top={top ? undefined : 0}
        bottom={0}
        right={0}
        w={`${modalPanelWidth}px`}
        maxW="100vw"
        h={top ? undefined : '100vh'}
        maxH={`calc(100vh - ${top}px)`}
        overflowY="auto"
        zIndex={1}
        borderLeftWidth={top ? 0 : '1px'}
        borderTopWidth={top ? '1px' : 0}
      >
        {children}
      </GlassBox>
    </Modal>
  )
}
