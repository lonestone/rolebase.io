import { useColorMode } from '@chakra-ui/react'

export function useHoverItemStyle() {
  const { colorMode } = useColorMode()
  return { bg: colorMode === 'light' ? 'blackAlpha.50' : 'whiteAlpha.100' }
}
