import { $convertFromMarkdownString } from '@lexical/markdown'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, useRef } from 'react'

interface Props {
  value: string
}

export default function ControlledValuePlugin({ value }: Props) {
  const [editor] = useLexicalComposerContext()
  const mounted = useRef(false)

  // Update value when it changes
  useEffect(() => {
    // Don't update the value at first render
    // because it's already set by by initial state
    if (!mounted.current) return

    // JSON
    if (value[0] === '{') {
      const editorState = editor.parseEditorState(value)
      editor.setEditorState(editorState)
    } else {
      // Markdown
      editor.update(() => $convertFromMarkdownString(value))
    }
  }, [editor, value])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    }
  }, [])

  return null
}
