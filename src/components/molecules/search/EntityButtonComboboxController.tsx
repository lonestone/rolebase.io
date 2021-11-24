import React from 'react'
import { Control, Controller } from 'react-hook-form'
import EntityButtonCombobox from './EntityButtonCombobox'
import { SearchOptions } from './useSearchItems'

interface Props extends SearchOptions {
  name: string
  control: Control<any>
}

// Markdown editor
// Docs:
// https://github.com/RIP21/react-simplemde-editor
// https://github.com/Ionaru/easy-markdown-editor

export default function EntityButtonComboboxController({
  name,
  control,
  ...options
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ onChange, value }) => (
        <EntityButtonCombobox value={value} onChange={onChange} {...options} />
      )}
    />
  )
}
