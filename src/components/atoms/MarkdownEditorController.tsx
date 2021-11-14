import React from 'react'
import { Control, Controller } from 'react-hook-form'
import MarkdownEditor from './MarkdownEditor'

interface Props {
  name: string
  placeholder?: string
  control: Control<any>
}

export default function MarkdownEditorController({
  name,
  placeholder,
  control,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ onChange, value }) => (
        <MarkdownEditor
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    />
  )
}
