import { FormControlOptions, useFormControl } from '@chakra-ui/react'
import { pick } from '@utils/pick'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react'
import { EditorHandle } from './lib/plugins/EditorRefPlugin'
import RichEditor from './lib/RichEditor'
import useFileUpload from './useFileUpload'
import useMentionables from './useMentionables'

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
    const mentionables = useMentionables()

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
      onChange?.(localRef.current.getValue(true))
    }, [onChange])

    // Save on Ctrl+S or Cmd+Enter
    const handleSubmit = useCallback(() => {
      if (!localRef.current) return
      onSubmit?.(localRef.current.getValue(true))
    }, [onSubmit])

    return (
      <RichEditor
        ref={localRef}
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        readOnly={computedReadOnly}
        minH={minHeight}
        maxH={maxHeight}
        mentionables={mentionables}
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
