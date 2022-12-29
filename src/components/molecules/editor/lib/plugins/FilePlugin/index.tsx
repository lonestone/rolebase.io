import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from 'lexical'
import { useEffect } from 'react'

import { $createFileNode, FileNode, FilePayload } from '../../nodes/FileNode'

export const INSERT_FILE_COMMAND: LexicalCommand<FilePayload> = createCommand(
  'INSERT_FILE_COMMAND'
)

export default function FilePlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([FileNode])) {
      throw new Error('FilePlugin: FileNode not registered on editor')
    }

    return mergeRegister(
      editor.registerCommand<FilePayload>(
        INSERT_FILE_COMMAND,
        (payload) => {
          const fileNode = $createFileNode(payload)

          const selection = $getSelection()
          if (!$isRangeSelection(selection)) {
            return true
          }

          const focus = selection.focus
          const focusNode = focus.getNode()

          if (focusNode === null) return true

          if ($isRootOrShadowRoot(focusNode)) {
            const target = focusNode.getChildAtIndex(focus.offset)

            if (target !== null) {
              target.insertBefore(fileNode)
            } else {
              focusNode.append(fileNode)
            }

            fileNode.insertBefore($createParagraphNode())
          } else {
            const topLevelNode = focusNode.getTopLevelElementOrThrow()
            topLevelNode.insertAfter(fileNode)
          }

          return true
        },
        COMMAND_PRIORITY_EDITOR
      )
    )
  }, [editor])

  return null
}
