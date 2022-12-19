import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import {
  BLUR_COMMAND,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_LOW,
  FOCUS_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
} from 'lexical'
import { useEffect } from 'react'

interface Props {
  onFocus?: () => void
  onBlur?: () => void
  onSubmit?: () => void // When the user presses Cmd/Ctrl + Enter
}

export default function MainEventsPlugin({ onFocus, onBlur, onSubmit }: Props) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        FOCUS_COMMAND,
        () => {
          onFocus?.()
          return false
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand(
        BLUR_COMMAND,
        () => {
          onBlur?.()
          return false
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        (event) => {
          if (event && (event.metaKey || event.ctrlKey)) {
            onSubmit?.()
            return true
          }
          return false
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        (event) => {
          // Prevent modal from closing
          event.preventDefault()
          return false
        },
        COMMAND_PRIORITY_LOW
      )
    )
  }, [editor, onFocus, onBlur, onSubmit])

  return null
}
