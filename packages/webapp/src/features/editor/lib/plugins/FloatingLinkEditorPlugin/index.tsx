/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  $isAutoLinkNode,
  $isLinkNode,
  TOGGLE_LINK_COMMAND,
} from '@lexical/link'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $findMatchingParent, mergeRegister } from '@lexical/utils'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  KEY_ESCAPE_COMMAND,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import React, {
  Dispatch,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import { CheckIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Input } from '@chakra-ui/react'
import { FiX } from 'react-icons/fi'
import { getSelectedNode } from '../../utils/getSelectedNode'
import { setFloatingElemPosition } from '../../utils/setFloatingElemPosition'
import { sanitizeUrl } from '../../utils/url'

export const defaultUrl = 'https://'

function FloatingLinkEditor({
  editor,
  isLink,
  setIsLink,
  anchorElem,
}: {
  editor: LexicalEditor
  isLink: boolean
  setIsLink: Dispatch<boolean>
  anchorElem: HTMLElement
}) {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const originalUrlRef = useRef<string | undefined>()
  const [linkUrl, setLinkUrl] = useState('')

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent)) {
        originalUrlRef.current = parent.getURL()
      } else if ($isLinkNode(node)) {
        originalUrlRef.current = node.getURL()
      } else {
        originalUrlRef.current = undefined
      }
      setLinkUrl(originalUrlRef.current ?? '')
    }
    const editorElem = editorRef.current
    const nativeSelection = window.getSelection()

    if (editorElem === null) {
      return
    }

    const rootElement = editor.getRootElement()

    if (
      selection !== null &&
      nativeSelection !== null &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode) &&
      editor.isEditable()
    ) {
      const domRect: DOMRect | undefined =
        nativeSelection.focusNode?.parentElement?.getBoundingClientRect()
      if (domRect) {
        setFloatingElemPosition(domRect, editorElem, anchorElem)
      }
    }

    return true
  }, [anchorElem, editor])

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement

    const update = () => {
      editor.getEditorState().read(() => {
        updateLinkEditor()
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
  }, [anchorElem.parentElement, editor, updateLinkEditor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor()
        })
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor()
          return true
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        () => {
          if (isLink) {
            setIsLink(false)
            return true
          }
          return false
        },
        COMMAND_PRIORITY_HIGH
      )
    )
  }, [editor, updateLinkEditor, setIsLink, isLink])

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor()
    })
  }, [editor, updateLinkEditor])

  useEffect(() => {
    if (isLink && linkUrl === defaultUrl && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isLink, linkUrl])

  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const isEnter = event.key === 'Enter'
    const isEscape = event.key === 'Escape'
    if (!isEnter && !isEscape) return
    event.preventDefault()
    if (linkUrl === defaultUrl) {
      handleRemove()
    } else {
      if (isEnter) {
        handleSave()
      } else {
        handleReset()
      }
    }
  }

  const handleSave = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl(linkUrl) || null)
    setIsLink(false)
  }

  const handleReset = () => {
    if (!originalUrlRef.current) return
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, originalUrlRef.current)
    setIsLink(false)
  }

  const handleRemove = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    setIsLink(false)
  }

  return (
    <Flex
      ref={editorRef}
      bg="gray.50"
      _dark={{
        bg: 'gray.600',
      }}
      position="absolute"
      zIndex={1000}
      top={0}
      left={0}
      w="350px"
      maxW="95%"
      p={1}
      borderRadius="md"
      boxShadow="lg"
      fontSize="sm"
    >
      <Input
        ref={inputRef}
        value={linkUrl}
        size="sm"
        flex={1}
        onChange={(event) => setLinkUrl(event.target.value)}
        onKeyDown={handleKeydown}
      />
      <IconButton
        aria-label="Remove"
        icon={<FiX />}
        size="sm"
        ml={1}
        onClick={handleRemove}
      />
      <IconButton
        aria-label="Save"
        icon={<CheckIcon />}
        size="sm"
        ml={1}
        onClick={handleSave}
      />
    </Flex>
  )
}

export default function FloatingLinkEditorPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement
}) {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [isLink, setIsLink] = useState(false)

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const linkParent = $findMatchingParent(node, $isLinkNode)
      const autoLinkParent = $findMatchingParent(node, $isAutoLinkNode)

      // We don't want this menu to open for auto links.
      if (linkParent != null && autoLinkParent == null) {
        setIsLink(true)
      } else {
        setIsLink(false)
      }
    }
  }, [])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar()
          setActiveEditor(newEditor)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      )
    )
  }, [editor, updateToolbar])

  if (!editor.isEditable()) return null

  return isLink
    ? createPortal(
        <FloatingLinkEditor
          editor={activeEditor}
          isLink={isLink}
          anchorElem={anchorElem}
          setIsLink={setIsLink}
        />,
        anchorElem
      )
    : null
}
