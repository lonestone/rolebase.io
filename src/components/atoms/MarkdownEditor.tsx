import { IconButton } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { Editor } from 'codemirror'
import { Options } from 'easymde'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { FaFont } from 'react-icons/fa'
import SimpleMDE from 'react-simplemde-editor'
import BasicStyle from './BasicStyle'

interface Props {
  placeholder?: string
  value: string
  autoFocus?: boolean
  onChange(value: string): void
  onSubmit?(value: string): void // Called when Enter key is pressed
}

// Markdown editor
// Docs:
// https://github.com/RIP21/react-simplemde-editor
// https://github.com/Ionaru/easy-markdown-editor

const StyledEditor = styled.div`
  .CodeMirror {
    border-color: #e2e8f0;
    border-radius: 6px;
    &.CodeMirror-focused {
      border-color: #3182ce;
      box-shadow: 0 0 0 1px #3182ce;
    }
  }
  .editor-toolbar {
    border: none;
  }
`

export default function MarkdownEditor({
  placeholder,
  value,
  autoFocus,
  onChange,
  onSubmit,
}: Props) {
  // Show toolbar button when input is focused
  const [showToolbarButton, setShowToolbarButton] = useState(false)
  // Toggle toolbar with button
  const [showToolbar, setShowToolbar] = useState(false)

  // SimpleMDE options
  const options: Options = useMemo(
    () => ({
      placeholder,
      minHeight: '0px',
      status: false,
      inputStyle: 'contenteditable', // Required for nativeSpellcheck
      nativeSpellcheck: true,
      spellChecker: false,
      previewImagesInEditor: true,
      toolbar: showToolbar ? undefined : false,
    }),
    [placeholder, showToolbar]
  )

  const codemirrorRef = useRef<Editor>()
  const getCodemirrorInstance = useCallback(
    (instance: Editor) => {
      codemirrorRef.current = instance

      // Auto focus
      if (autoFocus) {
        codemirrorRef.current?.focus()
      }

      // Listen to Enter key to submit
      instance.on('keydown', (editor, event) => {
        if (event.code === 'Enter' && !event.shiftKey) {
          if (onSubmit) {
            onSubmit(editor.getValue())
            event.preventDefault()
          }
        }
      })

      // Disable tab/shift+tab to allow changing focus
      const extraKeys = instance.getOption('extraKeys')
      instance.setOption('extraKeys', {
        ...(typeof extraKeys === 'object' ? extraKeys : {}),
        Tab: false,
        'Shift-Tab': false,
      })
    },
    [autoFocus, onSubmit]
  )
  const positionRef = useRef<CodeMirror.Position>()

  const handleFocus = useCallback(() => setShowToolbarButton(true), [])
  const handleBlur = useCallback(() => setShowToolbarButton(false), [])

  const handleToggleToolbar = useCallback(() => {
    // Save position
    positionRef.current = codemirrorRef.current?.getCursor()
    // Toggle toolbar
    setShowToolbar((show) => !show)
    // Re-focus editor and set cursor position
    setTimeout(() => {
      const instance = codemirrorRef.current
      if (instance) {
        instance.focus()
        if (positionRef.current) {
          instance.setCursor(positionRef.current)
        }
      }
    }, 0)
  }, [])

  return (
    <BasicStyle position="relative">
      {(showToolbarButton || showToolbar) && (
        <IconButton
          icon={<FaFont />}
          aria-label=""
          tabIndex={-1}
          position="absolute"
          zIndex="1"
          top="9px"
          right="9px"
          size="sm"
          onMouseDown={handleToggleToolbar}
        />
      )}
      <StyledEditor>
        <SimpleMDE
          value={value}
          onChange={onChange}
          options={options}
          onFocus={handleFocus}
          onBlur={handleBlur}
          getCodemirrorInstance={getCodemirrorInstance}
        />
      </StyledEditor>
    </BasicStyle>
  )
}
