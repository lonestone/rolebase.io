/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { TOGGLE_LINK_COMMAND } from '@lexical/link'
import { mergeRegister } from '@lexical/utils'
import {
  $getSelection,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import React, { useCallback, useEffect, useRef } from 'react'

import { ButtonGroup, IconButton } from '@chakra-ui/react'
import { FaStrikethrough } from 'react-icons/fa'
import { FiBold, FiCode, FiItalic, FiLink, FiUnderline } from 'react-icons/fi'
import { getDOMRangeRect } from '../../utils/getDOMRangeRect'
import { setFloatingElemPosition } from '../../utils/setFloatingElemPosition'
import { defaultUrl } from '../FloatingLinkEditorPlugin'

interface Props {
  editor: LexicalEditor
  anchorElem: HTMLElement
  isBold: boolean
  isCode: boolean
  isItalic: boolean
  isLink: boolean
  isStrikethrough: boolean
  isUnderline: boolean
}

export function TextFormatFloatingToolbar({
  editor,
  anchorElem,
  isLink,
  isBold,
  isItalic,
  isUnderline,
  isCode,
  isStrikethrough,
}: Props) {
  const popupCharStylesEditorRef = useRef<HTMLDivElement | null>(null)

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, defaultUrl)
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }, [editor, isLink])

  const updateTextFormatFloatingToolbar = useCallback(() => {
    const selection = $getSelection()

    const popupCharStylesEditorElem = popupCharStylesEditorRef.current
    const nativeSelection = window.getSelection()

    if (popupCharStylesEditorElem === null) {
      return
    }

    const rootElement = editor.getRootElement()
    if (
      selection !== null &&
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement)

      setFloatingElemPosition(rangeRect, popupCharStylesEditorElem, anchorElem)
    }
  }, [editor, anchorElem])

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement

    const update = () => {
      editor.getEditorState().read(() => {
        updateTextFormatFloatingToolbar()
      })
    }
    window.addEventListener('resize', update)

    if (scrollerElem) {
      scrollerElem.addEventListener('scroll', update)
    }

    return () => {
      window.removeEventListener('resize', update)
      if (scrollerElem) {
        scrollerElem.removeEventListener('scroll', update)
      }
    }
  }, [editor, updateTextFormatFloatingToolbar, anchorElem])

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateTextFormatFloatingToolbar()
    })
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateTextFormatFloatingToolbar()
        })
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateTextFormatFloatingToolbar()
          return false
        },
        COMMAND_PRIORITY_LOW
      )
    )
  }, [editor, updateTextFormatFloatingToolbar])

  if (!editor.isEditable()) return null

  return (
    <ButtonGroup
      ref={popupCharStylesEditorRef}
      bg="gray.50"
      _dark={{
        bg: 'gray.600',
      }}
      size="sm"
      variant="ghost"
      spacing={1}
      position="absolute"
      zIndex={1000}
      top={0}
      left={0}
      p={1}
      borderRadius="md"
      boxShadow="lg"
    >
      <IconButton
        aria-label="Format text as bold"
        isActive={isBold}
        icon={<FiBold />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
        }}
      />
      <IconButton
        aria-label="Format text as italics"
        isActive={isItalic}
        icon={<FiItalic />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
        }}
      />
      <IconButton
        aria-label="Format text to underlined"
        isActive={isUnderline}
        icon={<FiUnderline />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
        }}
      />
      <IconButton
        aria-label="Format text with a strikethrough"
        isActive={isStrikethrough}
        icon={<FaStrikethrough />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
        }}
      />
      <IconButton
        aria-label="Insert code block"
        isActive={isCode}
        icon={<FiCode />}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')
        }}
      />
      <IconButton
        aria-label="Insert link"
        icon={<FiLink />}
        isActive={isLink}
        onClick={insertLink}
      />
    </ButtonGroup>
  )
}
