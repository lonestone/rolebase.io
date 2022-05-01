import React, { ForwardedRef, forwardRef, RefAttributes } from 'react'
import { Control, Controller, Path } from 'react-hook-form'
import { MarkdownEditorHandle } from './chunk/useMarkdownEditor'
import MarkdownEditor from './MarkdownEditor'

interface Props<Values> {
  name: Path<Values>
  control: Control<Values>
  placeholder?: string
  autoFocus?: boolean
}

function MarkdownEditorController<Values>(
  { name, placeholder, autoFocus, control }: Props<Values>,
  ref: ForwardedRef<MarkdownEditorHandle>
) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={'' as any}
      render={({ field }) => (
        <MarkdownEditor
          ref={ref}
          value={field.value as string}
          onChange={field.onChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
      )}
    />
  )
}

export default forwardRef(MarkdownEditorController) as any as <Values>(
  props: Props<Values> & RefAttributes<MarkdownEditorHandle>
) => ReturnType<typeof MarkdownEditorController>
