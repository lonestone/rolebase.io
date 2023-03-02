import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect } from 'react'

interface Props {
  editable?: boolean
}

export default function EditablePlugin({ editable }: Props) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.setEditable(editable || false)
  }, [editor, editable])

  return null
}
