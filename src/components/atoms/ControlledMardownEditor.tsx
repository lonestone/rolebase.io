import React, { useMemo } from 'react'
import { Control, Controller } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'

interface Props {
  name: string
  placeholder?: string
  control: Control<any>
}

// Markdown editor
// Docs:
// https://github.com/RIP21/react-simplemde-editor
// https://github.com/Ionaru/easy-markdown-editor

export default function ControlledMardownEditor({
  name,
  placeholder,
  control,
}: Props) {
  const options = useMemo(
    () => ({
      placeholder,
      minHeight: '0px',
      status: false,
      spellChecker: false,
    }),
    [placeholder]
  )

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ onChange, value }) => (
        <SimpleMDE value={value} onChange={onChange} options={options} />
      )}
    />
  )
}
