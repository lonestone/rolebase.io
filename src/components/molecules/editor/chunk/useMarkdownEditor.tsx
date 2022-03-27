import RichMarkdownEditor from '@rolebase/editor'
import { ForwardedRef, useImperativeHandle, useRef } from 'react'

export interface MarkdownEditorHandle {
  setValue(value: string): void
  getValue(): string
}

export default function useMarkdownEditor(
  ref: ForwardedRef<MarkdownEditorHandle>
) {
  const editorRef = useRef<RichMarkdownEditor>(null)

  // Helper to get the current value
  const getValue = () => {
    const v = editorRef.current?.value()
    if (!v) return ''
    // Trim "\" at start and end
    return v.replace(/^(\\\n)+|(\\\n)+$/g, '').trim()
  }

  // Update value of editor without rendering the component
  const setValue = (value: string) => {
    const editor = editorRef.current
    if (!editor) return
    const newState = editor.createState(value)
    editor.view.updateState(newState)
  }

  // Instance methods
  useImperativeHandle(ref, () => ({ setValue, getValue }), [])

  return { editorRef, setValue, getValue }
}
