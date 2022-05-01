import RichMarkdownEditor, { YCollab } from '@rolebase/editor'
import {
  ForwardedRef,
  RefObject,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react'

export interface MarkdownEditorHandle {
  editorRef: RefObject<RichMarkdownEditor>
  setValue(value: string): void
  getValue(): string
  focus(): void
  addBulletList(): void
  addCheckboxList(): void
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
  const setValue = useCallback((value: string) => {
    const editor = editorRef.current
    if (!editor) return
    const yCollabPlugin = editor.extensions.extensions.find(
      (e) => e.name === 'y-collab'
    ) as YCollab | undefined
    if (yCollabPlugin) {
      yCollabPlugin.applyValue(value)
    } else {
      const newState = editor.createState(value)
      editor.view.updateState(newState)
    }
  }, [])

  // Focus editor
  const focus = useCallback(() => {
    editorRef.current?.focusAtEnd()
  }, [])

  // Add bullet list at the end
  const addBulletList = useCallback(() => {
    const editor = editorRef.current
    if (!editor) return
    editor.focusAtEnd()
    setTimeout(() => {
      editor.focusAtEnd()
      editor.commands.bullet_list()
    }, 0)
  }, [])

  // Add checkbox at the end
  const addCheckboxList = useCallback(() => {
    editorRef.current?.focusAtEnd()
    setTimeout(() => {
      editorRef.current?.focusAtEnd()
      editorRef.current?.commands.checkbox_list()
    }, 0)
  }, [])

  // Instance methods
  useImperativeHandle(
    ref,
    () => ({
      editorRef,
      setValue,
      getValue,
      focus,
      addBulletList,
      addCheckboxList,
    }),
    []
  )

  return {
    editorRef,
    setValue,
    getValue,
    focus,
    addBulletList,
    addCheckboxList,
  }
}
