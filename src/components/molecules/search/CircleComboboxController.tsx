import React from 'react'
import { Control, Controller } from 'react-hook-form'
import CircleCombobox from './CircleCombobox'

interface Props {
  name: string
  control: Control<any>
}

// Markdown editor
// Docs:
// https://github.com/RIP21/react-simplemde-editor
// https://github.com/Ionaru/easy-markdown-editor

export default function CircleComboboxController({ name, control }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ onChange, value }) => (
        <CircleCombobox value={value} onChange={onChange} />
      )}
    />
  )
}
