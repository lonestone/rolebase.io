import { Tab, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'

interface Props {
  icon: React.ReactNode
  children: string
}

export function CirclePanelTab({ icon, children }: Props) {
  const { colorMode } = useColorMode()
  return (
    <Tab
      fontWeight={600}
      color="gray.500"
      pl={0}
      _selected={{
        color: colorMode === 'light' ? 'black' : 'white',
      }}
      _hover={{
        color: colorMode === 'light' ? 'gray.550' : 'gray.400',
      }}
    >
      {icon}
      <Text ml={2} fontSize="sm">
        {children}
      </Text>
    </Tab>
  )
}
