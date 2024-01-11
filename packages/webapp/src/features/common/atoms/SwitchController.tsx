import { SwitchProps } from '@chakra-ui/react'
import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import Switch from './Switch'

interface Props<Values extends FieldValues> extends SwitchProps {
  name: Path<Values>
  control: Control<Values>
}

export default function SwitchController<Values extends FieldValues>({
  control,
  name,
  ...props
}: Props<Values>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <Switch
          onChange={(e) => onChange(e.target.checked)}
          onBlur={onBlur}
          isChecked={value}
          {...props}
        />
      )}
    ></Controller>
  )
}
