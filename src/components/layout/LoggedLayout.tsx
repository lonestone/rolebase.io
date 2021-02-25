import { Flex } from '@chakra-ui/react'
import React from 'react'
import Header from './Header'

const LoggedLayout: React.FC = ({ children }) => (
  <Flex minHeight="100vh" flexDirection="column">
    <Header />
    {children}
  </Flex>
)

export default LoggedLayout
