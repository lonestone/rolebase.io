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
import { EditorHandle } from '../editor2/plugins/EditorRefPlugin'
import RichEditor from '../editor2/RichEditor'
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
  onSave?(value: string): void
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
    const currentMember = useCurrentMember()
    const localRef = useRef<EditorHandle>(null)
    const { handleUpload } = useFileUpload()

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
