import { Tab, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'

interface Props {
  icon: React.ReactNode
  children: string
}

export function StyledTab({ icon, children }: Props) {
  const { colorMode } = useColorMode()
  return (
    <Tab
      fontWeight={600}
      pl={0}
      py={3}
      color={colorMode === 'light' ? 'gray.500' : 'whiteAlpha.600'}
      _hover={{
        color: colorMode === 'light' ? 'gray.550' : 'whiteAlpha.800',
      }}
      _selected={{
        color: colorMode === 'light' ? 'gray.900' : 'white',
      }}
    >
      {icon}
      <Text ml={2} fontSize="sm">
        {children}
      </Text>
    </Tab>
  )
}
