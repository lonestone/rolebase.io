/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { DRAG_DROP_PASTE } from '@lexical/rich-text'
import { COMMAND_PRIORITY_LOW } from 'lexical'
import { useEffect } from 'react'
import { INSERT_FILE_COMMAND } from '../FilePlugin'

import { INSERT_IMAGE_COMMAND } from '../ImagesPlugin'

interface DragDropProps {
  onUpload: (file: File) => Promise<string>
}

export default function DragDropPaste({ onUpload }: DragDropProps): null {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    return editor.registerCommand(
      DRAG_DROP_PASTE,
      (files) => {
        ;(async () => {
          for (const file of files) {
            try {
              editor.setEditable(false)
              // TODO: Show loading
              const url = await onUpload(file)
              editor.setEditable(true)
              // Images
              if (url && file.type.startsWith('image/')) {
                editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                  src: url,
                })
              } else {
                // Other type of file
                editor.dispatchCommand(INSERT_FILE_COMMAND, {
                  url,
                  name: file.name,
                  size: file.size,
                  mime: file.type,
                })
              }
            } catch (e) {
              editor.setEditable(true)
            }
          }
        })()
        return true
      },
      COMMAND_PRIORITY_LOW
    )
  }, [editor, onUpload])
  return null
}
