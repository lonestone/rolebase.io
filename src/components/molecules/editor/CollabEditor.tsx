import { Box, FormControlOptions, Spinner } from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import { usePreventClose } from '@hooks/usePreventClose'
import throttle from 'lodash.throttle'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { EditorHandle } from './lib/plugins/EditorRefPlugin'
import RichEditor from './lib/RichEditor'
import useFileUpload from './useFileUpload'
import useMentionables from './useMentionables'

// Collaborative Markdown editor

export interface Props extends FormControlOptions {
  docId: string
  value: string
  placeholder?: string
  autoFocus?: boolean
  readOnly?: boolean
  saveDelay: number
  onSave?(value: string): void
}

const CollabEditor = forwardRef<EditorHandle, Props>(
  (
    { docId, value, placeholder, autoFocus, readOnly, saveDelay, onSave },
    ref
  ) => {
    const currentMember = useCurrentMember()
    const localRef = useRef<EditorHandle>(null)
    const { handleUpload } = useFileUpload()
    const mentionables = useMentionables()

    useImperativeHandle(ref, () => localRef.current!, [])

    // Prevent from changing page when dirty
    const [isDirty, setIsDirty] = useState(false)
    const { preventClose, allowClose } = usePreventClose()

    // Save with throttling
    const handleSaveThrottle = useMemo(
      () =>
        throttle(
          (value: string) => {
            setIsDirty(false)
            allowClose()
            onSave?.(value)
          },
          saveDelay,
          { leading: false }
        ),
      [docId, saveDelay]
    )

    // Handle every little change in the doc
    // to save it with throttling
    const handleChange = useCallback(() => {
      const newValue = localRef.current?.getValue()
      if (!newValue || newValue === value) return
      setIsDirty(true)
      preventClose()
      handleSaveThrottle(newValue)
    }, [docId, value])

    return (
      <>
        <RichEditor
          key={docId}
          ref={localRef}
          id={docId}
          collaboration
          username={currentMember?.name}
          value={value}
          placeholder={placeholder}
          autoFocus={autoFocus}
          readOnly={readOnly}
          mentionables={mentionables}
          onBlur={handleChange}
          onSubmit={handleChange}
          onUpload={handleUpload}
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
      </>
    )
  }
)

CollabEditor.displayName = 'CollabEditor'

export default CollabEditor
