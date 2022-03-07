import {
  FormControlOptions,
  useColorMode,
  useFormControl,
} from '@chakra-ui/react'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import {
  default as Editor,
  default as RichMarkdownEditor,
} from 'rich-markdown-editor'
import light, { dark } from 'rich-markdown-editor/dist/styles/theme'
import BasicStyle from '../../atoms/BasicStyle'
import MarkdownEditorContainer from './MarkdownEditorContainer'

// Markdown editor
// Docs: https://github.com/outline/rich-markdown-editor

interface Props extends FormControlOptions {
  placeholder?: string
  value: string
  autoFocus?: boolean
  onChange?(value: string): void
  onSave?(value: string): void // Called when Ctrl+S is pressed
  onSubmit?(value: string): void // Called when Cmd+Enter is pressed
}

// Override themes
light.text = dark.text = 'inherit'
light.background = dark.background = 'inherit'
light.zIndex = dark.zIndex = 1400

export interface MarkdownEditorHandle {
  setValue(value: string): void
}

const MarkdownEditor = forwardRef<MarkdownEditorHandle, Props>(
  ({ placeholder, value, autoFocus, onChange, onSave, onSubmit }, ref) => {
    const formControlProps = useFormControl<HTMLInputElement>({})
    const { colorMode } = useColorMode()

    const editorRef = useRef<RichMarkdownEditor>(null)
    const extensions = useMemo(() => [], [])

    // Helper to get the current value
    const getValue = () => {
      const v = editorRef.current?.value()
      if (!v) return ''
      // Trim "\" at start and end
      return v.replace(/^(\\\n)+|(\\\n)+$/g, '').trim()
    }

    // Instance methods
    useImperativeHandle(ref, () => ({
      setValue(value) {
        const editor = editorRef.current
        if (!editor) return
        const newState = editor.createState(value)
        editor.view.updateState(newState)
      },
    }))

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
      <BasicStyle position="relative">
        <MarkdownEditorContainer colorMode={colorMode} {...formControlProps}>
          <Editor
            ref={editorRef}
            value={value}
            placeholder={placeholder}
            autoFocus={autoFocus}
            dark={colorMode === 'dark'}
            theme={colorMode === 'light' ? light : dark}
            extensions={extensions}
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
