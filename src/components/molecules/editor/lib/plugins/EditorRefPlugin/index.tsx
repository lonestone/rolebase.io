/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { insertList } from '@lexical/list'
import { $convertFromMarkdownString } from '@lexical/markdown'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $rootTextContent } from '@lexical/text'
import { CLEAR_EDITOR_COMMAND, LexicalEditor } from 'lexical'
import { forwardRef, useImperativeHandle } from 'react'
import { markdownTransformers } from '../MarkdownTransformers'

export interface EditorHandle {
  editor: LexicalEditor
  getValue(cleanEmpty?: boolean): string
  getText(): string
  setValue(value: string): void
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
  const getValue = (cleanEmpty?: boolean): string => {
    if (cleanEmpty) {
      // If text value is empty or only contains spaces, return empty string
      const text = getText()
      if (text.trim() === '') {
        return ''
      }
    }
    return JSON.stringify(editor.getEditorState().toJSON())
  }

  // Get the current text
  const getText = (): string => editor.getEditorState().read($rootTextContent)

  // Update value of editor without rendering the component
  const setValue = (value: string) => setEditorValue(editor, value)

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

export function setEditorValue(editor: LexicalEditor, value: string) {
  // JSON
  if (value[0] === '{') {
    const editorState = editor.parseEditorState(value)
    editor.setEditorState(editorState)
  } else {
    // Markdown
    editor.update(() => $convertFromMarkdownString(value, markdownTransformers))
  }
}
