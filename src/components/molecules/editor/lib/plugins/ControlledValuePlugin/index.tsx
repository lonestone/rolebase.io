import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, useRef } from 'react'
import { setEditorValue } from '../EditorRefPlugin'

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

    // Set new value
    setTimeout(() => {
      setEditorValue(editor, value)
    }, 0) // Prevent flushSync warning
  }, [editor, value])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    }
  }, [])

  return null
}
