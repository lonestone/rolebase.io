import { Box } from '@chakra-ui/react'
import React from 'react'

// Top = padding (15px) + header height (56px) = 71px

const Panel: React.FC = ({ children }) => (
  <Box
    bg="white"
    borderRadius="0.375rem"
    shadow="md"
    position="absolute"
    top="71px"
    right="15px"
    width="450px"
    p={5}
  >
    {children}
  </Box>
)

export default Panel
