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
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { Box, BoxProps, Circle, Tooltip } from '@chakra-ui/react'
import { randomColor } from '@chakra-ui/theme-tools'
import { useElementSize } from '@hooks/useElementSize'
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin'
import { nanoid } from 'nanoid'
import { createWebsocketProvider } from './collaboration'
import {
  SharedHistoryContext,
  useSharedHistoryContext,
} from './context/SharedHistoryContext'
import nodes from './nodes'
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin'
import { AutoFocusPlugin } from './plugins/AutoFocusPlugin'
import AutoLinkPlugin from './plugins/AutoLinkPlugin'
import ClickableLinkPlugin from './plugins/ClickableLinkPlugin'
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin'
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin'
import CollapsiblePlugin from './plugins/CollapsiblePlugin'
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin'
import ControlledValuePlugin from './plugins/ControlledValuePlugin'
import DragDropPaste from './plugins/DragDropPastePlugin'
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin'
import EditablePlugin from './plugins/EditablePlugin'
import EditorRefPlugin, { EditorHandle } from './plugins/EditorRefPlugin'
import EmojiPickerPlugin from './plugins/EmojiPickerPlugin'
import EquationsPlugin from './plugins/EquationsPlugin'
import FigmaPlugin from './plugins/FigmaPlugin'
import FilePlugin from './plugins/FilePlugin'
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin'
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin'
import ImagesPlugin from './plugins/ImagesPlugin'
import LinkPlugin from './plugins/LinkPlugin'
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin'
import MainEventsPlugin from './plugins/MainEventsPlugin'
import MarkdownShortcutPlugin from './plugins/MarkdownShortcutPlugin'
import { markdownTransformers } from './plugins/MarkdownTransformers'
import MentionsPlugin, { Mentionable } from './plugins/MentionsPlugin'
import SpeechToTextPlugin from './plugins/SpeechToTextPlugin'
import TabFocusPlugin from './plugins/TabFocusPlugin'
import TableActionMenuPlugin from './plugins/TableActionMenuPlugin'
import TableCellResizer from './plugins/TableCellResizer'
import TwitterPlugin from './plugins/TwitterPlugin'
import YouTubePlugin from './plugins/YouTubePlugin'
import RichEditorTheme from './themes/RichEditorTheme'
import { CollabOfflineOverlay } from './ui/CollabOfflineOverlay'
import Placeholder from './ui/Placeholder'

import './RichEditor.css'

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
  mentionables?: Mentionable[]
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
    return () => $convertFromMarkdownString(value, markdownTransformers)
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

  const isControlled = typeof value === 'string' && !collaboration

  const initialEditorState = useMemo(
    () => fixInitialState(value),
    [isControlled ? value : undefined]
  )

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

  const contentRef = useRef<HTMLDivElement>(null)
  const contentSize = useElementSize(contentRef)

  useEffect(() => {
    if (!contentRef.current) {
      throw new Error('RichEditor: Content ref not found at mount')
    }
    setFloatingAnchorElem(contentRef.current)
  }, [])

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
  const [collaborationStatus, setCollaborationStatus] = useState(false)

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
          {autoFocus && (!collaboration || collaborationStatus) && (
            <AutoFocusPlugin />
          )}
          {mentionables && <MentionsPlugin mentionables={mentionables} />}

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
              {isControlled && <ControlledValuePlugin value={value} />}
            </>
          )}

          <RichTextPlugin
            contentEditable={
              <Box
                bg={readOnly ? undefined : 'whiteAlpha.500'}
                borderWidth={readOnly ? 0 : '1px'}
                borderRadius={readOnly ? 0 : 'md'}
                borderColor={isFocused ? 'outline' : undefined}
                boxShadow={
                  isFocused
                    ? '0 0 0 1px var(--chakra-colors-outline)'
                    : undefined
                }
                outline={0}
                overflowY={
                  maxH && (contentSize?.height || 0) > 60 ? 'auto' : 'visible'
                }
                maxH={maxH}
                _dark={{
                  bg: readOnly ? undefined : 'blackAlpha.100',
                }}
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
            placeholder={
              !readOnly ? <Placeholder>{placeholder}</Placeholder> : null
            }
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
          <TabIndentationPlugin />
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

          {collaboration && !collaborationStatus && <CollabOfflineOverlay />}

          {collaboration && !readOnly && (
            <Tooltip
              label={
                collaborationStatus
                  ? 'Collaboration Online'
                  : 'Collaboration Offline'
              }
              placement="top"
              hasArrow
            >
              <Circle
                position="absolute"
                top="0.4em"
                right="0.4em"
                size="0.5em"
                bg={collaborationStatus ? 'green.500' : 'red.500'}
              />
            </Tooltip>
          )}
        </Box>
      </SharedHistoryContext>
    </LexicalComposer>
  )
})
