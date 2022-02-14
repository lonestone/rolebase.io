import { NumberInputProps } from '@chakra-ui/react'
import React from 'react'
import { Control, Controller, Path } from 'react-hook-form'
import NumberInput from './NumberInput'

interface Props<Values> extends NumberInputProps {
  name: Path<Values>
  control: Control<Values>
}

export default function NumberInputController<Values>({
  name,
  control,
  ...inputProps
}: Props<Values>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <NumberInput
          {...inputProps}
          value={field.value as number}
          onChange={(value) => field.onChange(value)}
        />
      )}
    />
  )
}
