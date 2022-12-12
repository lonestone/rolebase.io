import {
  FormControlOptions,
  useColorMode,
  useFormControl,
} from '@chakra-ui/react'
import BasicStyle from '@components/atoms/BasicStyle'
import React, { forwardRef, useCallback, useRef } from 'react'
import Editor from '../editor2/Editor'
import EditorContainer from './EditorContainer'
import useSimpleEditor, { EditorHandle } from './useEditor'
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
  onSave?(value: string): void // Called when Ctrl+S is pressed
  onSubmit?(value: string): void // Called when Cmd+Enter is pressed
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
      onSave,
      onSubmit,
    },
    ref
  ) => {
    const formControlProps = useFormControl<HTMLInputElement>({})
    const { colorMode } = useColorMode()
    const { editorRef, getValue } = useSimpleEditor(ref)
    const { handleUpload } = useFileUpload()

    const isFocusRef = useRef<boolean>(false)

    const handleFocus = useCallback(() => {
      isFocusRef.current = true
    }, [])

    // Save on blur
    const handleBlur = useCallback(() => {
      isFocusRef.current = false
      onChange?.(getValue())
    }, [onChange])

    // Save changes when user do not have focus
    // eg: click on a Todo checkbox
    const handleChange = useCallback(() => {
      if (!isFocusRef.current) {
        onChange?.(getValue())
      }
    }, [])

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
        <EditorContainer
          colorMode={colorMode}
          minHeight={minHeight}
          maxHeight={maxHeight}
          {...formControlProps}
        >
          <Editor
            value={value}
            placeholder={placeholder}
            autoFocus={autoFocus}
            readOnly={readOnly}
            dark={colorMode === 'dark'}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSave={handleSave}
            onChange={handleChange}
            uploadImage={handleUpload}
          />
        </EditorContainer>
      </BasicStyle>
    )
  }
)

SimpleEditor.displayName = 'SimpleEditor'

export default SimpleEditor
