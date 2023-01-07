import {
  ModalContextProvider,
  ModalProps,
  StylesProvider,
  useModal,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import { SidebarContext } from '@contexts/SidebarContext'
import React, { useContext } from 'react'
import GlassBox from './GlassBox'

// Inspired by https://github.com/chakra-ui/chakra-ui/blob/main/packages/modal/src/modal.tsx

export const modalPanelWidth = 450

export default function ModalPanel({
  children,
  ...props
}: Omit<ModalProps, 'isOpen'>) {
  const styles = useMultiStyleConfig('Modal', props)
  const modal = useModal({ isOpen: true, ...props })
  const sidebarContext = useContext(SidebarContext)

  const context = {
    ...modal,
  }

  return (
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
      <ModalContextProvider value={context}>
        <StylesProvider value={styles}>{children}</StylesProvider>
      </ModalContextProvider>
    </GlassBox>
  )
}
