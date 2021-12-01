import { Center, Spinner, SpinnerProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends SpinnerProps {
  active: boolean
  center?: boolean
}

export default function Loading({
  active,
  center,
  size = 'xl',
  ...spinnerProps
}: Props) {
  return active ? (
    center ? (
      <Center position="fixed" top="0" left="0" right="0" bottom="0">
        <Spinner size={size} {...spinnerProps} />
      </Center>
    ) : (
      <Center>
        <Spinner size={size} {...spinnerProps} />
      </Center>
    )
  ) : null
}
