import {
  Box,
  ModalContextProvider,
  ModalProps,
  StylesProvider,
  useColorMode,
  useModal,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import React from 'react'

// Inspired by https://github.com/chakra-ui/chakra-ui/blob/main/packages/modal/src/modal.tsx

export default function ModalPanel({
  children,
  ...props
}: Omit<ModalProps, 'isOpen'>) {
  const { colorMode } = useColorMode()
  const styles = useMultiStyleConfig('Modal', props)
  const modal = useModal({ isOpen: true, ...props })

  const context = {
    ...modal,
  }

  return (
    <Box
      w="450px"
      maxW="100vw"
      overflow="auto"
      zIndex={1}
      bg={colorMode === 'light' ? 'white' : 'gray.700'}
      borderRadius={0}
      borderLeftWidth={'1px'}
      borderLeftColor={colorMode === 'light' ? 'gray.200' : 'gray.550'}
    >
      <ModalContextProvider value={context}>
        <StylesProvider value={styles}>{children}</StylesProvider>
      </ModalContextProvider>
    </Box>
  )
}
