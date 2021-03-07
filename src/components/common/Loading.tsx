import { Center, Spinner } from '@chakra-ui/react'
import React from 'react'

interface Props {
  active: boolean
  center?: boolean
}

export default function Loading({ active, center }: Props) {
  return active ? (
    center ? (
      <Center position="absolute" top="0" left="0" right="0" bottom="0">
        <Spinner size="xl" />
      </Center>
    ) : (
      <Center>
        <Spinner size="xl" />
      </Center>
    )
  ) : null
}
