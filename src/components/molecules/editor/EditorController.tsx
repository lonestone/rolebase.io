import React, { ForwardedRef, forwardRef, RefAttributes } from 'react'
import { Control, Controller, Path } from 'react-hook-form'
import SimpleEditor from './SimpleEditor'
import { EditorHandle } from './useEditor'

interface Props<Values> {
  name: Path<Values>
  control: Control<Values>
  placeholder?: string
  autoFocus?: boolean
}

function EditorController<Values>(
  { name, placeholder, autoFocus, control }: Props<Values>,
  ref: ForwardedRef<EditorHandle>
) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={'' as any}
      render={({ field }) => (
        <SimpleEditor
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

export default forwardRef(EditorController) as any as <Values>(
  props: Props<Values> & RefAttributes<EditorHandle>
) => ReturnType<typeof EditorController>
