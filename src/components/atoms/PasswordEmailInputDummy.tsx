import { Box, Input } from '@chakra-ui/react'
import React from 'react'

// Hidden email field to make password generation
// works with password managers

export default function PasswordEmailInputDummy() {
  return (
    <Box position="absolute" zIndex={-1} opacity="0">
      <Input name="email" type="email" autoComplete="email" tabIndex={-1} />
    </Box>
  )
}
