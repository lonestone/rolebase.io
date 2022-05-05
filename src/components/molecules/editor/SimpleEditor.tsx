import {
  FormControlOptions,
  useColorMode,
  useFormControl,
} from '@chakra-ui/react'
import BasicStyle from '@components/atoms/BasicStyle'
import RichSimpleEditor from '@rolebase/editor'
import React, { forwardRef, useCallback } from 'react'
import EditorContainer from './EditorContainer'
import useSimpleEditor, { EditorHandle } from './useEditor'
import useFileUpload from './useFileUpload'

// Simple Markdown editor

export interface Props extends FormControlOptions {
  value: string
  placeholder?: string
  autoFocus?: boolean
  readOnly?: boolean
  onChange?(value: string): void
  onSave?(value: string): void // Called when Ctrl+S is pressed
  onSubmit?(value: string): void // Called when Cmd+Enter is pressed
}

const SimpleEditor = forwardRef<EditorHandle, Props>(
  (
    { value, placeholder, autoFocus, readOnly, onChange, onSave, onSubmit },
    ref
  ) => {
    const formControlProps = useFormControl<HTMLInputElement>({})
    const { colorMode } = useColorMode()
    const { editorRef, getValue } = useSimpleEditor(ref)
    const { handleUpload } = useFileUpload()

    // Save on blur
    const handleBlur = useCallback(() => {
      onChange?.(getValue())
    }, [onChange])

    // Save on Ctrl+S or Cmd+Enter
    const handleSave = useCallback(
      ({ done }) => {
        if (done) {
          onSubmit?.(getValue())
        } else {
          onSave?.(getValue())
        }
      },
      [onSubmit, onSave]
    )

    return (
      <BasicStyle>
        <EditorContainer colorMode={colorMode} {...formControlProps}>
          <RichSimpleEditor
            ref={editorRef}
            value={value}
            placeholder={placeholder}
            autoFocus={autoFocus}
            readOnly={readOnly}
            dark={colorMode === 'dark'}
            onBlur={handleBlur}
            onSave={handleSave}
            uploadImage={handleUpload}
          />
        </EditorContainer>
      </BasicStyle>
    )
  }
)

SimpleEditor.displayName = 'SimpleEditor'

export default SimpleEditor
