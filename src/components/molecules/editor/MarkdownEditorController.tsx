import React from 'react'
import { Control, Controller, Path } from 'react-hook-form'
import MarkdownEditor from './MarkdownEditor'

interface Props<Values> {
  name: Path<Values>
  control: Control<Values>
  placeholder?: string
  autoFocus?: boolean
}

export default function MarkdownEditorController<Values>({
  name,
  placeholder,
  autoFocus,
  control,
}: Props<Values>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={'' as any}
      render={({ field }) => (
        <MarkdownEditor
          value={field.value as string}
          onChange={field.onChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
      )}
    />
  )
}
