/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { insertList } from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { LexicalEditor, SerializedEditorState } from 'lexical'
import { forwardRef, useImperativeHandle } from 'react'

export interface EditorHandle {
  editor: LexicalEditor
  getValue(): SerializedEditorState
  setValue(value: SerializedEditorState): void
  addBulletList(): void
  addCheckboxList(): void
}

export default forwardRef<EditorHandle>(function EditorRefPlugin(
  props,
  ref
): null {
  const [editor] = useLexicalComposerContext()

  // Helper to get the current value
  const getValue = () => editor.getEditorState().toJSON()

  // Update value of editor without rendering the component
  const setValue = (value: SerializedEditorState) => {
    const editorState = editor.parseEditorState(value)
    editor.setEditorState(editorState)
  }

  // Add bullet list at the end
  const addBulletList = () => insertList(editor, 'bullet')

  // Add checkbox at the end
  const addCheckboxList = () => insertList(editor, 'check')

  // Instance methods
  useImperativeHandle(
    ref,
    () => ({
      editor,
      setValue,
      getValue,
      addBulletList,
      addCheckboxList,
    }),
    [editor]
  )

  return null
})
