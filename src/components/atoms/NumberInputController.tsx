import { NumberInputProps } from '@chakra-ui/react'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import NumberInput from './NumberInput'

interface Props extends NumberInputProps {
  name: string
  control: Control<any>
}

export default function NumberInputController({
  name,
  onChange,
  control,
  ...props
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <NumberInput
          value={field.value}
          onChange={(value) => field.onChange(value)}
          {...props}
        />
      )}
    />
  )
}
