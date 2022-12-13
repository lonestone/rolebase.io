/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import { CollaborationPlugin } from '@lexical/react/LexicalCollaborationPlugin'
import {
  InitialConfigType,
  InitialEditorStateType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'
import React, { forwardRef, useMemo, useState } from 'react'

import { Box } from '@chakra-ui/react'
import { randomColor } from '@chakra-ui/theme-tools'
import { createWebsocketProvider } from './collaboration'
import {
  SharedHistoryContext,
  useSharedHistoryContext,
} from './context/SharedHistoryContext'
import nodes from './nodes'
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin'
import AutoLinkPlugin from './plugins/AutoLinkPlugin'
import ClickableLinkPlugin from './plugins/ClickableLinkPlugin'
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin'
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin'
import CollapsiblePlugin from './plugins/CollapsiblePlugin'
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin'
import DragDropPaste from './plugins/DragDropPastePlugin'
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin'
import EditorRefPlugin, { EditorHandle } from './plugins/EditorRefPlugin'
import EmojiPickerPlugin from './plugins/EmojiPickerPlugin'
import EquationsPlugin from './plugins/EquationsPlugin'
import FigmaPlugin from './plugins/FigmaPlugin'
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin'
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin'
import HorizontalRulePlugin from './plugins/HorizontalRulePlugin'
import ImagesPlugin from './plugins/ImagesPlugin'
import LinkPlugin from './plugins/LinkPlugin'
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin'
import MarkdownShortcutPlugin from './plugins/MarkdownShortcutPlugin'
import MentionsPlugin from './plugins/MentionsPlugin'
import SpeechToTextPlugin from './plugins/SpeechToTextPlugin'
import TabFocusPlugin from './plugins/TabFocusPlugin'
import TableActionMenuPlugin from './plugins/TableActionMenuPlugin'
import TableCellResizer from './plugins/TableCellResizer'
import TwitterPlugin from './plugins/TwitterPlugin'
import YouTubePlugin from './plugins/YouTubePlugin'
import RichEditorTheme from './themes/RichEditorTheme'
import Placeholder from './ui/Placeholder'

import './index.css'

interface EditorProps {
  placeholder?: string
  isCollab: boolean
  username?: string
  minH?: string
  maxH?: string
  mentionables?: string[]
  onUpload?: (file: File) => Promise<string>
  acceptFileTypes?: string[]
  value?: InitialEditorStateType
}

export default forwardRef<EditorHandle, EditorProps>(function Editor(
  {
    placeholder,
    isCollab,
    username,
    minH,
    maxH,
    mentionables,
    onUpload = async () => '',
    acceptFileTypes = [],
    value,
  },
  ref
) {
  const { historyState } = useSharedHistoryContext()
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null)

  const initialConfig: InitialConfigType = useMemo(
    () => ({
      editorState: value ?? null,
      namespace: 'Playground',
      nodes: [...nodes],
      onError: (error: Error) => {
        throw error
      },
      theme: RichEditorTheme,
    }),
    [value]
  )

  const contentRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  const cursorColor = useMemo(
    () => randomColor({ string: username || '' }),
    [username]
  )

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <Box position="relative">
          <EditorRefPlugin ref={ref} />
          <DragDropPaste onUpload={onUpload} accept={acceptFileTypes} />
          <AutoFocusPlugin defaultSelection="rootEnd" />
          <ClearEditorPlugin />
          <ComponentPickerPlugin />
          <EmojiPickerPlugin />
          <AutoEmbedPlugin />
          <MentionsPlugin mentionables={mentionables || []} />
          <HashtagPlugin />
          <SpeechToTextPlugin />
          <AutoLinkPlugin />
          {/*
      <CommentPlugin
        providerFactory={isCollab ? createWebsocketProvider : undefined}
      />
      */}

          {isCollab ? (
            <CollaborationPlugin
              id="main"
              username={username}
              cursorColor={cursorColor}
              providerFactory={createWebsocketProvider}
              shouldBootstrap
            />
          ) : (
            <HistoryPlugin externalHistoryState={historyState} />
          )}
          <RichTextPlugin
            contentEditable={
              <Box
                borderWidth="1px"
                borderRadius="md"
                outline={0}
                overflowY={maxH ? 'auto' : 'visible'}
                maxH={maxH}
              >
                <Box ref={contentRef} position="relative">
                  <ContentEditable
                    className="ContentEditable"
                    style={minH ? { minHeight: minH } : undefined}
                  />
                  <Box sx={{ clear: 'both' }} />
                </Box>
              </Box>
            }
            placeholder={<Placeholder>{placeholder}</Placeholder>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MarkdownShortcutPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <TablePlugin />
          <TableCellResizer />
          <ImagesPlugin onUpload={onUpload} />
          <LinkPlugin />
          <TwitterPlugin />
          <YouTubePlugin />
          <FigmaPlugin />
          <ClickableLinkPlugin />
          <HorizontalRulePlugin />
          <EquationsPlugin />
          <TabFocusPlugin />
          <CollapsiblePlugin />
          {floatingAnchorElem && (
            <>
              <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
              <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
              <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
              <TableActionMenuPlugin anchorElem={floatingAnchorElem} />
              <FloatingTextFormatToolbarPlugin
                anchorElem={floatingAnchorElem}
              />
            </>
          )}
        </Box>
      </SharedHistoryContext>
    </LexicalComposer>
  )
})
