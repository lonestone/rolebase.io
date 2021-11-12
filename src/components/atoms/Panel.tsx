import { Box } from '@chakra-ui/react'
import React from 'react'

// Top = padding (15px) + header height (56px) = 71px

const Panel: React.FC = ({ children }) => (
  <Box
    bg="white"
    rounded="md"
    shadow="md"
    position="absolute"
    top="71px"
    left="15px"
    width="450px"
    overflowY="auto"
    maxH="calc(100vh - 71px)"
    p={5}
  >
    {children}
  </Box>
)

export default Panel
