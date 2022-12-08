/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import React from 'react'
import { SharedAutocompleteContext } from './context/SharedAutocompleteContext'
import { SharedHistoryContext } from './context/SharedHistoryContext'
import Editor from './Editor'
import PlaygroundNodes from './nodes'
import { TableContext } from './plugins/TablePlugin'
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme'

export function App() {
  const initialConfig = {
    editorState: null,
    namespace: 'Playground',
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error
    },
    theme: PlaygroundEditorTheme,
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <SharedAutocompleteContext>
            <Editor isCollab />
          </SharedAutocompleteContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  )
}
