import { Box, FormControl, FormLabel } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface Props {
  label: string
  children: ReactNode
}

export function FormRow({ label, children }: Props) {
  return (
    <FormControl display="flex" justifyContent="space-between">
      <FormLabel mr={0} pt={2}>
        {label}
      </FormLabel>
      <Box w="60%">{children}</Box>
    </FormControl>
  )
}
