import { Box, Center, Icon, keyframes, Text } from '@chakra-ui/react'
import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi'

const shine = keyframes`
  to { background-position-x: -200%; }
`

export function CollabOfflineOverlay() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      background="linear-gradient(110deg, rgba(128, 128, 128, 0.05) 8%, rgba(128, 128, 128, 0.15) 28%, rgba(128, 128, 128, 0.05) 33%)"
      backgroundSize="200% 100%"
      animation={`1.5s ${shine} linear infinite`}
    >
      <Center h="100%">
        <Text fontSize="sm" color="gray.500">
          <Icon as={FiAlertTriangle} mr={2} />
          You are offline. Connection to server..
        </Text>
      </Center>
    </Box>
  )
}
