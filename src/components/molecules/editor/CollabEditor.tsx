import {
  Box,
  FormControlOptions,
  Spinner,
  useColorMode,
  useFormControl,
} from '@chakra-ui/react'
import { randomColor } from '@chakra-ui/theme-tools'
import BasicStyle from '@components/atoms/BasicStyle'
import useCurrentMember from '@hooks/useCurrentMember'
import { usePreventClose } from '@hooks/usePreventClose'
import RichSimpleEditor, { YCollab } from '@rolebase/editor'
import throttle from 'lodash.throttle'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import EditorContainer from './EditorContainer'
import useEditor, { EditorHandle } from './useEditor'
import useFileUpload from './useFileUpload'

// Collaborative Markdown editor

export interface Props extends FormControlOptions {
  docId: string
  value: string
  updates?: Uint8Array
  placeholder?: string
  autoFocus?: boolean
  readOnly?: boolean
  saveDelay: number
  onSave?(value: string, updates: Uint8Array): void
}

const CollabEditor = forwardRef<EditorHandle, Props>(
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
    const { editorRef, getValue } = useEditor(ref)
    const { handleUpload } = useFileUpload()

    // Connect provider and get context
    const collabPlugin = useMemo(() => new YCollab(docId), [docId])

    // Stop collab on unmount
    const prevDocId = useRef(docId)
    useEffect(
      () => () => {
        if (prevDocId.current !== docId) {
          prevDocId.current = docId
          collabPlugin.stop()
        }
      },
      [docId]
    )

    // On mount
    const valueApplied = useRef(false)
    useEffect(() => {
      if (valueApplied.current) return
      valueApplied.current = true
      if (updates) {
        // Apply saved updates
        collabPlugin.applyUpdates(updates)
      } else {
        // Compute and apply updates from value
        collabPlugin.applyValue(value)

        // Save updates
        onSave?.(getValue(), collabPlugin.getUpdates())
      }
    }, [docId])

    // Update member name
    useEffect(() => {
      if (!currentMember) return
      collabPlugin.setUserName(
        currentMember.name,
        randomColor({ string: currentMember.name })
      )
    }, [currentMember?.name])

    // Prevent from changing page when dirty
    const [isDirty, setIsDirty] = useState(false)
    const { preventClose, allowClose } = usePreventClose()

    // Save now
    const handleSave = useCallback(() => {
      onSave?.(getValue(), collabPlugin.getUpdates())
      setIsDirty(false)
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
      if (newValue === value) return
      setIsDirty(true)
      preventClose()
      handleSaveThrottle()
    }, [docId, value])

    return (
      <BasicStyle>
        <EditorContainer colorMode={colorMode} {...formControlProps}>
          <RichSimpleEditor
            key={docId}
            ref={editorRef}
            placeholder={placeholder}
            autoFocus={autoFocus}
            readOnly={readOnly}
            dark={colorMode === 'dark'}
            extensions={[collabPlugin]}
            onChange={handleChange}
            onSave={handleSave}
            uploadImage={handleUpload}
          />

          {isDirty && (
            <Box textAlign="right">
              <Spinner
                size="xs"
                color="gray"
                position="absolute"
                mt="-18px"
                ml="-18px"
              />
            </Box>
          )}
        </EditorContainer>
      </BasicStyle>
    )
  }
)

CollabEditor.displayName = 'CollabEditor'

export default CollabEditor
