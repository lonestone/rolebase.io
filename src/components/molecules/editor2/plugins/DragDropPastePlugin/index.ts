/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { DRAG_DROP_PASTE } from '@lexical/rich-text'
import { isMimeType } from '@lexical/utils'
import { COMMAND_PRIORITY_LOW } from 'lexical'
import { useEffect } from 'react'

import { INSERT_IMAGE_COMMAND } from '../ImagesPlugin'

interface DragDropProps {
  accept: string[]
  onUpload: (file: File) => Promise<string>
}

export default function DragDropPaste({
  accept,
  onUpload,
}: DragDropProps): null {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    return editor.registerCommand(
      DRAG_DROP_PASTE,
      (files) => {
        ;(async () => {
          for (const file of files) {
            if (
              isMimeType(
                file,
                // IsMimeType don't accept blobs
                accept.map((x) => x.replace(/\/\*$/, ''))
              )
            ) {
              try {
                editor.setEditable(false)
                const src = await onUpload(file)
                editor.setEditable(true)
                // Images
                if (src && file.type.startsWith('image/')) {
                  editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                    src,
                  })
                }
              } catch (e) {
                editor.setEditable(true)
              }
            }
          }
        })()
        return true
      },
      COMMAND_PRIORITY_LOW
    )
  }, [editor, accept, onUpload])
  return null
}
