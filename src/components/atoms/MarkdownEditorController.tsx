import React from 'react'
import { Control, Controller } from 'react-hook-form'
import MarkdownEditor from './MarkdownEditor'

interface Props {
  name: string
  placeholder?: string
  autoFocus?: boolean
  control: Control<any>
}

export default function MarkdownEditorController({
  name,
  placeholder,
  autoFocus,
  control,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <MarkdownEditor
          value={field.value}
          onChange={field.onChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
      )}
    />
  )
}
