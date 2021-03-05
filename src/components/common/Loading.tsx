import { Center, Spinner } from '@chakra-ui/react'
import React from 'react'

interface Props {
  active: boolean
}

export default function Loading({ active }: Props) {
  return active ? (
    <Center height="100%">
      <Spinner size="xl" />
    </Center>
  ) : null
}
