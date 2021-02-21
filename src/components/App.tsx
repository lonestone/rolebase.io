import { ChakraProvider, Flex } from '@chakra-ui/react'
import React from 'react'
import Circles from './Circles'
import Members from './Members'

export default function App() {
  return (
    <ChakraProvider>
      <Flex minHeight="100vh">
        <Members />
        <Circles />
      </Flex>
    </ChakraProvider>
  )
}
