import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import { CONNECTED_COMMAND } from '@lexical/yjs'
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
  onCollaborationStatusChange?: (status: boolean) => void
}

export default function MainEventsPlugin({
  onFocus,
  onBlur,
  onSubmit,
  onCollaborationStatusChange,
}: Props) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return mergeRegister(
      // Focus
      editor.registerCommand(
        FOCUS_COMMAND,
        () => {
          onFocus?.()
          return false
        },
        COMMAND_PRIORITY_LOW
      ),

      // Blur
      editor.registerCommand(
        BLUR_COMMAND,
        () => {
          onBlur?.()
          return false
        },
        COMMAND_PRIORITY_LOW
      ),

      // Ctrl/Cmd + Enter -> Submit
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

      // Escape
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        (event) => {
          // Prevent modal from closing
          event.preventDefault()
          return false
        },
        COMMAND_PRIORITY_LOW
      ),

      // Collaboration status
      editor.registerCommand(
        CONNECTED_COMMAND,
        (status) => {
          onCollaborationStatusChange?.(status)
          return false
        },
        COMMAND_PRIORITY_EDITOR
      )
    )
  }, [editor, onFocus, onBlur, onSubmit])

  return null
}
