import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as NbInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

interface Props extends Omit<NumberInputProps, 'onChange'> {
  onChange(value: number): void
}

export default function NumberInput({ onChange, value, ...inputProps }: Props) {
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

  return (
    <NbInput value={tmpValue} onChange={handleChange} {...inputProps}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NbInput>
  )
}
