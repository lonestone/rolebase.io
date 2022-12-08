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
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'
import React, { useState } from 'react'

import { createWebsocketProvider } from './collaboration'
import { useSharedHistoryContext } from './context/SharedHistoryContext'
import TableCellNodes from './nodes/TableCellNodes'
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin'
import AutoLinkPlugin from './plugins/AutoLinkPlugin'
import ClickableLinkPlugin from './plugins/ClickableLinkPlugin'
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin'
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin'
import CollapsiblePlugin from './plugins/CollapsiblePlugin'
import CommentPlugin from './plugins/CommentPlugin'
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin'
import DragDropPaste from './plugins/DragDropPastePlugin'
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin'
import EmojiPickerPlugin from './plugins/EmojiPickerPlugin'
import EmojisPlugin from './plugins/EmojisPlugin'
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
import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin'
import TableCellResizer from './plugins/TableCellResizer'
import { TablePlugin as NewTablePlugin } from './plugins/TablePlugin'
import TwitterPlugin from './plugins/TwitterPlugin'
import YouTubePlugin from './plugins/YouTubePlugin'
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme'
import ContentEditable from './ui/ContentEditable'
import Placeholder from './ui/Placeholder'

interface Props {
  isCollab: boolean
}

export default function Editor({ isCollab }: Props) {
  const { historyState } = useSharedHistoryContext()
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  const cellEditorConfig = {
    namespace: 'Playground',
    nodes: [...TableCellNodes],
    onError: (error: Error) => {
      throw error
    },
    theme: PlaygroundEditorTheme,
  }

  return (
    <>
      <div className="editor-container">
        <DragDropPaste />
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        <ComponentPickerPlugin />
        <EmojiPickerPlugin />
        <AutoEmbedPlugin />
        <MentionsPlugin />
        <EmojisPlugin />
        <HashtagPlugin />
        <SpeechToTextPlugin />
        <AutoLinkPlugin />
        <CommentPlugin
          providerFactory={isCollab ? createWebsocketProvider : undefined}
        />

        {isCollab ? (
          <CollaborationPlugin
            id="main"
            providerFactory={createWebsocketProvider}
            shouldBootstrap
          />
        ) : (
          <HistoryPlugin externalHistoryState={historyState} />
        )}
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor" ref={onRef}>
                <ContentEditable />
              </div>
            </div>
          }
          placeholder={<Placeholder>Enter some text...</Placeholder>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MarkdownShortcutPlugin />
        <CodeHighlightPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <ListMaxIndentLevelPlugin maxDepth={7} />
        <TablePlugin />
        <TableCellResizer />
        <NewTablePlugin cellEditorConfig={cellEditorConfig}>
          <AutoFocusPlugin />
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="TableNode__contentEditable" />
            }
            placeholder=""
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MentionsPlugin />
          <HistoryPlugin />
          <ImagesPlugin captionsEnabled={false} />
          <LinkPlugin />
          <ClickableLinkPlugin />
          <FloatingTextFormatToolbarPlugin />
        </NewTablePlugin>
        <ImagesPlugin />
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
            <TableCellActionMenuPlugin anchorElem={floatingAnchorElem} />
            <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />
          </>
        )}
      </div>
    </>
  )
}
