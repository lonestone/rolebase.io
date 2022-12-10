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
import React, { useMemo, useState } from 'react'

import { Box } from '@chakra-ui/react'
import { randomColor } from '@chakra-ui/theme-tools'
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
import RichEditorTheme from './themes/RichEditorTheme'
import ContentEditable from './ui/ContentEditable'
import Placeholder from './ui/Placeholder'

interface Props {
  placeholder?: string
  isCollab: boolean
  username?: string
  minH?: string
  maxH?: string
}

export default function Editor({
  placeholder,
  isCollab,
  username,
  minH,
  maxH,
}: Props) {
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
    theme: RichEditorTheme,
  }

  const cursorColor = useMemo(
    () => randomColor({ string: username || '' }),
    [username]
  )

  return (
    <Box position="relative">
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
            minH={minH}
            maxH={maxH}
          >
            <Box ref={onRef} position="relative">
              <ContentEditable />
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
      <NewTablePlugin cellEditorConfig={cellEditorConfig}>
        <AutoFocusPlugin />
        <RichTextPlugin
          contentEditable={
            <Box position="relative">
              <ContentEditable />
            </Box>
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
    </Box>
  )
}
