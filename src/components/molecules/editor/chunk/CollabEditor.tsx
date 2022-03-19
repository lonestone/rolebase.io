import {
  FormControlOptions,
  useColorMode,
  useFormControl,
} from '@chakra-ui/react'
import BasicStyle from '@components/atoms/BasicStyle'
import useCurrentMember from '@hooks/useCurrentMember'
import { usePreventClose } from '@hooks/usePreventClose'
import RichMarkdownEditor from '@rolebase/editor'
import light, { dark } from '@rolebase/editor/dist/styles/theme'
import { Bytes } from 'firebase/firestore'
import throttle from 'lodash.throttle'
import React, { forwardRef, useCallback, useEffect, useMemo } from 'react'
import { prosemirrorToYDoc } from 'y-prosemirror'
import * as Y from 'yjs'
import MarkdownEditorContainer from '../chunk/MarkdownEditorContainer'
import useFileUpload from '../chunk/useFileUpload'
import { YCollabExtension } from '../chunk/YCollabExtension'
import useMarkdownEditor, { MarkdownEditorHandle } from './useMarkdownEditor'

// Collaborative Markdown editor

export interface Props extends FormControlOptions {
  docId: string
  value: string
  updates?: Bytes
  placeholder?: string
  autoFocus?: boolean
  readOnly?: boolean
  saveDelay: number
  onSave?(value: string, updates: Uint8Array): void
}

const MarkdownCollabEditor = forwardRef<MarkdownEditorHandle, Props>(
  (
    {
      docId,
      value,
      updates,
      placeholder,
      autoFocus,
      readOnly,
      saveDelay,
      onSave,
    },
    ref
  ) => {
    const formControlProps = useFormControl<HTMLInputElement>({})
    const { colorMode } = useColorMode()
    const currentMember = useCurrentMember()
    const { editorRef, getValue } = useMarkdownEditor(ref)
    const { handleUpload } = useFileUpload()

    // Connect provider and get context
    const collabPlugin = useMemo(() => new YCollabExtension(docId), [docId])

    // Stop collab on unmount
    useEffect(() => () => collabPlugin.stop(), [docId])

    // On mount
    useEffect(() => {
      if (updates) {
        // Apply saved updates
        Y.applyUpdate(collabPlugin.ydoc, updates.toUint8Array())
      } else {
        const editor = editorRef.current
        if (!editor) return

        // Compute and apply updates from value
        const tmpYdoc = prosemirrorToYDoc(editor.createState(value).doc)
        const state = Y.encodeStateAsUpdate(tmpYdoc)
        Y.applyUpdate(collabPlugin.ydoc, state)

        // Save updates
        onSave?.(getValue(), state)
      }
    }, [docId])

    // Update member name
    useEffect(() => {
      if (!currentMember) return
      collabPlugin.setUserName(currentMember.name)
    }, [currentMember?.name])

    // Prevent from changing page when dirty
    const { preventClose, allowClose } = usePreventClose()

    // Save now
    const handleSave = useCallback(() => {
      onSave?.(getValue(), Y.encodeStateAsUpdate(collabPlugin.ydoc))
      allowClose()
    }, [docId])

    // Save with throttling
    const handleSaveThrottle = useMemo(
      () => throttle(handleSave, saveDelay, { leading: false }),
      [handleSave, saveDelay]
    )

    // Handle every little change in the doc
    // to save it with throttling
    const handleChange = useCallback(() => {
      const newValue = getValue()
      const hasChanged = newValue !== '' && newValue !== value
      if (!hasChanged) return
      preventClose()
      handleSaveThrottle()
    }, [docId, value])

    return (
      <BasicStyle>
        <MarkdownEditorContainer colorMode={colorMode} {...formControlProps}>
          <RichMarkdownEditor
            key={docId}
            ref={editorRef}
            placeholder={placeholder}
            autoFocus={autoFocus}
            readOnly={readOnly}
            dark={colorMode === 'dark'}
            theme={colorMode === 'light' ? light : dark}
            extensions={[collabPlugin]}
            onChange={handleChange}
            onSave={handleSave}
            uploadImage={handleUpload}
          />
        </MarkdownEditorContainer>
      </BasicStyle>
    )
  }
)

MarkdownCollabEditor.displayName = 'MarkdownCollabEditor'

export default MarkdownCollabEditor