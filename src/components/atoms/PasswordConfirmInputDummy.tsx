import { Box, Input } from '@chakra-ui/react'
import React from 'react'

// Hidden confirmation password field to make password generation
// works with password managers

export default function PasswordConfirmInputDummy() {
  return (
    <Box position="absolute" zIndex={-1} opacity="0">
      <Input
        name="confirmPassword"
        type="password"
        id="confirm-password"
        autoComplete="new-password"
        tabIndex={-1}
      />
    </Box>
  )
}
