import {
  FormControlOptions,
  useColorMode,
  useFormControl,
} from '@chakra-ui/react'
import BasicStyle from '@components/atoms/BasicStyle'
import RichMarkdownEditor from '@rolebase/editor'
import light, { dark } from '@rolebase/editor/dist/styles/theme'
import React, { forwardRef, useCallback } from 'react'
import EditorContainer from './EditorContainer'
import useFileUpload from './useFileUpload'
import useMarkdownEditor, { MarkdownEditorHandle } from './useMarkdownEditor'

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

const MarkdownEditor = forwardRef<MarkdownEditorHandle, Props>(
  (
    { value, placeholder, autoFocus, readOnly, onChange, onSave, onSubmit },
    ref
  ) => {
    const formControlProps = useFormControl<HTMLInputElement>({})
    const { colorMode } = useColorMode()
    const { editorRef, getValue } = useMarkdownEditor(ref)
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
          <RichMarkdownEditor
            ref={editorRef}
            value={value}
            placeholder={placeholder}
            autoFocus={autoFocus}
            readOnly={readOnly}
            dark={colorMode === 'dark'}
            theme={colorMode === 'light' ? light : dark}
            onBlur={handleBlur}
            onSave={handleSave}
            uploadImage={handleUpload}
          />
        </EditorContainer>
      </BasicStyle>
    )
  }
)

MarkdownEditor.displayName = 'MarkdownEditor'

export default MarkdownEditor
