import { Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
  error: Error
}

export default function TextError({ error }: Props) {
  return (
    <Text color="red" fontWeight="bold">
      Error: {error.message}
    </Text>
  )
}
