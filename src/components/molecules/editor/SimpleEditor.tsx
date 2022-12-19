import { FormControlOptions, useFormControl } from '@chakra-ui/react'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react'
import { pick } from 'src/utils/pick'
import Editor from '../editor2/Editor'
import { EditorHandle } from '../editor2/plugins/EditorRefPlugin'
import useFileUpload from './useFileUpload'

// Simple Markdown editor

export interface Props extends FormControlOptions {
  value: string
  placeholder?: string
  autoFocus?: boolean
  readOnly?: boolean
  minHeight?: string
  maxHeight?: string
  onChange?(value: string): void
  onSubmit?(value: string): void // When the user presses Cmd/Ctrl + Enter
}

const SimpleEditor = forwardRef<EditorHandle, Props>(
  (
    {
      value,
      placeholder,
      autoFocus,
      readOnly,
      minHeight,
      maxHeight,
      onChange,
      onSubmit,
    },
    ref
  ) => {
    const localRef = useRef<EditorHandle>(null)
    const formControlProps = useFormControl<HTMLInputElement>({})
    const { handleUpload } = useFileUpload()

    useImperativeHandle(ref, () => localRef.current!, [])

    const computedReadOnly =
      readOnly || formControlProps.readOnly || formControlProps.disabled
    const ariaProps = pick(
      formControlProps,
      'aria-describedby',
      'aria-invalid',
      'aria-readonly',
      'aria-required'
    )

    // Save on blur
    const handleBlur = useCallback(() => {
      if (!localRef.current) return
      onChange?.(JSON.stringify(localRef.current.getValue()))
    }, [onChange])

    // Save on Ctrl+S or Cmd+Enter
    const handleSubmit = useCallback(() => {
      if (!localRef.current) return
      onSubmit?.(JSON.stringify(localRef.current.getValue()))
    }, [onSubmit])

    return (
      <Editor
        ref={localRef}
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        readOnly={computedReadOnly}
        minH={minHeight}
        maxH={maxHeight}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
        onUpload={handleUpload}
        {...ariaProps}
      />
    )
  }
)

SimpleEditor.displayName = 'SimpleEditor'

export default SimpleEditor
