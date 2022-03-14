import {
  FormControlOptions,
  useColorMode,
  useFormControl,
} from '@chakra-ui/react'
import React, { forwardRef, useCallback } from 'react'
import RichMarkdownEditor from 'rich-markdown-editor'
import light, { dark } from 'rich-markdown-editor/dist/styles/theme'
import BasicStyle from '../../atoms/BasicStyle'
import MarkdownEditorContainer from './MarkdownEditorContainer'
import useMarkdownEditor, { MarkdownEditorHandle } from './useMarkdownEditor'

// Markdown editor
// Docs: https://github.com/outline/rich-markdown-editor

interface Props extends FormControlOptions {
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
        <MarkdownEditorContainer colorMode={colorMode} {...formControlProps}>
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
          />
        </MarkdownEditorContainer>
      </BasicStyle>
    )
  }
)

MarkdownEditor.displayName = 'MarkdownEditor'

export default MarkdownEditor
