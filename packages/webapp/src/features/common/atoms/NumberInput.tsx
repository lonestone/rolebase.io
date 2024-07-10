import {
  NumberInput as NbInput,
  NumberInputProps as NbInputProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from 'src/icons'

export interface NumberInputProps extends Omit<NbInputProps, 'onChange'> {
  onChange(value: number): void
}

export default function NumberInput({
  onChange,
  value,
  ...inputProps
}: NumberInputProps) {
  const [tmpValue, setTmpValue] = useState<string | number | undefined>(value)

  useEffect(() => {
    setTmpValue(value)
  }, [value])

  const handleChange = (value: string, valueNumber: number) => {
    setTmpValue(value)
    if (!isNaN(valueNumber)) {
      onChange(valueNumber)
    }
  }

  const iconSize = inputProps.size === 'sm' ? 12 : 16

  return (
    <NbInput value={tmpValue} onChange={handleChange} {...inputProps}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper>
          <ChevronUpIcon size={iconSize} />
        </NumberIncrementStepper>
        <NumberDecrementStepper>
          <ChevronDownIcon size={iconSize} />
        </NumberDecrementStepper>
      </NumberInputStepper>
    </NbInput>
  )
}
