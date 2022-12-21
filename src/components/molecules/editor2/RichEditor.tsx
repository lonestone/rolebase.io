/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { $convertFromMarkdownString } from '@lexical/markdown'
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
import React, { forwardRef, useCallback, useMemo, useState } from 'react'

import { Box, BoxProps, Center, Icon, Text } from '@chakra-ui/react'
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

import { nanoid } from 'nanoid'
import { FiAlertTriangle } from 'react-icons/fi'
import './index.css'
import { AutoFocusPlugin } from './plugins/AutoFocusPlugin'
import ControlledValuePlugin from './plugins/ControlledValuePlugin'
import EditablePlugin from './plugins/EditablePlugin'
import FilePlugin from './plugins/FilePlugin'
import MainEventsPlugin from './plugins/MainEventsPlugin'

export interface RichEditorProps extends BoxProps {
  id?: string
  value?: InitialEditorStateType
  placeholder?: string
  readOnly?: boolean
  autoFocus?: boolean
  collaboration?: boolean
  username?: string
  minH?: string
  maxH?: string
  mentionables?: string[]
  onUpload?: (file: File) => Promise<string>
  onFocus?: () => void
  onBlur?: () => void
  onSubmit?: () => void
}

function fixInitialState(
  value?: InitialEditorStateType
): InitialEditorStateType | undefined {
  if (!value) return undefined
  // Markdown
  if (typeof value === 'string' && value[0] !== '{') {
    return () => $convertFromMarkdownString(value)
  }
  // Other types: EditorState, string, function
  return value
}

export default forwardRef<EditorHandle, RichEditorProps>(function RichEditor(
  {
    id,
    value,
    placeholder,
    readOnly,
    autoFocus,
    collaboration,
    username,
    minH,
    maxH,
    mentionables,
    onUpload = async () => '',
    onFocus,
    onBlur,
    onSubmit,
    ...boxProps
  },
  ref
) {
  const { historyState } = useSharedHistoryContext()
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null)

  const initialEditorState = useMemo(() => fixInitialState(value), [value])

  const initialConfig: InitialConfigType = useMemo(
    () => ({
      editorState: collaboration ? null : initialEditorState,
      namespace: id || 'RichEditor' + nanoid(6),
      editable: !readOnly,
      nodes: [...nodes],
      onError: (error: Error) => {
        throw error
      },
      theme: RichEditorTheme,
    }),
    []
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

  // Focus
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = useCallback(() => {
    setIsFocused(true)
    onFocus?.()
  }, [onFocus])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
    onBlur?.()
  }, [onBlur])

  // Collaboration status
  const [collaborationStatus, setCollaborationStatus] = useState(true)

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <Box position="relative">
          <EditorRefPlugin ref={ref} />
          <MainEventsPlugin
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmit={onSubmit}
            onCollaborationStatusChange={setCollaborationStatus}
          />
          <EditablePlugin editable={!readOnly} />
          <DragDropPaste onUpload={onUpload} />
          {autoFocus && <AutoFocusPlugin />}
          <MentionsPlugin mentionables={mentionables || []} />

          {collaboration && id ? (
            <CollaborationPlugin
              id={id}
              initialEditorState={initialEditorState}
              username={username}
              cursorColor={cursorColor}
              providerFactory={createWebsocketProvider}
              shouldBootstrap
            />
          ) : (
            <>
              <HistoryPlugin externalHistoryState={historyState} />
              {typeof value === 'string' && (
                <ControlledValuePlugin value={value} />
              )}
            </>
          )}

          <RichTextPlugin
            contentEditable={
              <Box
                borderWidth={readOnly ? 0 : '1px'}
                borderRadius={readOnly ? 0 : 'md'}
                borderColor={isFocused ? 'outline' : undefined}
                boxShadow={
                  isFocused
                    ? '0 0 0 1px var(--chakra-colors-outline)'
                    : undefined
                }
                outline={0}
                overflowY={maxH ? 'auto' : 'visible'}
                maxH={maxH}
                _invalid={{
                  borderColor: 'red.500',
                  _dark: {
                    borderColor: 'red.300',
                  },
                }}
                {...boxProps}
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

          <ClearEditorPlugin />
          <ComponentPickerPlugin />
          <EmojiPickerPlugin />
          <AutoEmbedPlugin />
          <HashtagPlugin />
          <SpeechToTextPlugin />
          <AutoLinkPlugin />
          <MarkdownShortcutPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <TablePlugin />
          <TableCellResizer />
          <ImagesPlugin onUpload={onUpload} />
          <FilePlugin />
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

          {!collaborationStatus && (
            <Box position="absolute" top={0} left={0} right={0} bottom={0}>
              <Center h="100%">
                <Text fontSize="sm" color="gray.500">
                  <Icon as={FiAlertTriangle} mr={2} />
                  You are offline. Connection to server..
                </Text>
              </Center>
            </Box>
          )}
        </Box>
      </SharedHistoryContext>
    </LexicalComposer>
  )
})
