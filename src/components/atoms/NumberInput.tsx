import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as NbInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react'
import React from 'react'

interface Props extends Omit<NumberInputProps, 'onChange'> {
  onChange(value: number): void
}

export default function NumberInput({ onChange, ...props }: Props) {
  return (
    <NbInput onChange={(_, value) => onChange(value)} {...props}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NbInput>
  )
}
