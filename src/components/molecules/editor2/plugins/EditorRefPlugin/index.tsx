/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { insertList } from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $rootTextContent } from '@lexical/text'
import {
  CLEAR_EDITOR_COMMAND,
  LexicalEditor,
  SerializedEditorState,
} from 'lexical'
import { forwardRef, useImperativeHandle } from 'react'

export interface EditorHandle {
  editor: LexicalEditor
  getValue(): SerializedEditorState
  getText(): string
  setValue(value: SerializedEditorState): void
  clear(): void
  addBulletList(): void
  addCheckboxList(): void
}

export default forwardRef<EditorHandle>(function EditorRefPlugin(
  props,
  ref
): null {
  const [editor] = useLexicalComposerContext()

  // Get the current JSON state
  const getValue = () => editor.getEditorState().toJSON()

  // Get the current text
  const getText = () => editor.getEditorState().read($rootTextContent)

  // Update value of editor without rendering the component
  const setValue = (value: SerializedEditorState) => {
    const editorState = editor.parseEditorState(value)
    editor.setEditorState(editorState)
  }

  // Clear root
  const clear = () => editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)

  // Add bullet list at the end
  const addBulletList = () => insertList(editor, 'bullet')

  // Add checkbox at the end
  const addCheckboxList = () => insertList(editor, 'check')

  // Instance methods
  useImperativeHandle(
    ref,
    () => ({
      editor,
      getValue,
      getText,
      setValue,
      clear,
      addBulletList,
      addCheckboxList,
    }),
    [editor]
  )

  return null
})
