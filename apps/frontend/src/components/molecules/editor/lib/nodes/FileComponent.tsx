import {
  GridSelection,
  KEY_BACKSPACE_COMMAND,
  LexicalEditor,
  NodeKey,
  NodeSelection,
  RangeSelection,
} from 'lexical'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection'
import { mergeRegister } from '@lexical/utils'
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  KEY_DELETE_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { DownloadIcon } from '@chakra-ui/icons'
import { Flex, LinkBox, LinkOverlay, Spacer, Text } from '@chakra-ui/react'
import { $isFileNode } from './FileNode'

export default function FileComponent({
  url,
  size,
  name,
  mime,
  nodeKey,
}: {
  url: string
  size: number
  name: string
  mime: string
  nodeKey: NodeKey
}) {
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)
  const [editor] = useLexicalComposerContext()
  const [selection, setSelection] = useState<
    RangeSelection | NodeSelection | GridSelection | null
  >(null)
  const activeEditorRef = useRef<LexicalEditor | null>(null)
  const ref = useRef(null)

  const onDelete = useCallback(
    (payload: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event: KeyboardEvent = payload
        event.preventDefault()
        const node = $getNodeByKey(nodeKey)
        if ($isFileNode(node)) {
          node.remove()
        }
        setSelected(false)
      }
      return false
    },
    [isSelected, nodeKey, setSelected]
  )

  const handleLinkClick = useCallback((event: React.MouseEvent) => {
    if (event.shiftKey) {
      event.preventDefault()
    }
  }, [])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        setSelection(editorState.read(() => $getSelection()))
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_, activeEditor) => {
          activeEditorRef.current = activeEditor
          return false
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (payload) => {
          const event = payload
          if (event.target === ref.current) {
            if (event.shiftKey) {
              setSelected(!isSelected)
            }
            return true
          }

          return false
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      )
    )
  }, [clearSelection, editor, isSelected, nodeKey, onDelete, setSelected])

  const isFocused = $isNodeSelection(selection) && isSelected

  return (
    <LinkBox
      my={1}
      py={1}
      px={2}
      fontWeight="bold"
      borderWidth={isFocused ? '2px' : '0'}
      _hover={{
        bg: 'gray.50',
      }}
      _dark={{
        _hover: {
          bg: 'whiteAlpha.100',
        },
      }}
    >
      <Flex alignItems="center">
        <DownloadIcon />
        <LinkOverlay
          ref={ref}
          href={url}
          ml={2}
          draggable={false}
          onClick={handleLinkClick}
        >
          {name}
        </LinkOverlay>
        <Spacer />
        <Text fontWeight="normal" fontSize="xs" color="gray">
          {getReadableSize(size)}
        </Text>
      </Flex>
    </LinkBox>
  )
}

function getReadableSize(size: number) {
  const i = Math.floor(Math.log(size) / Math.log(1024))
  return (
    (size / Math.pow(1024, i)).toFixed(2) +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  )
}
