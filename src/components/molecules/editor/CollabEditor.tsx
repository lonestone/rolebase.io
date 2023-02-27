import { FormControlOptions } from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { EditorHandle } from './lib/plugins/EditorRefPlugin'
import RichEditor from './lib/RichEditor'
import useFileUpload from './useFileUpload'
import useMentionables from './useMentionables'

// Collaborative Markdown editor

interface Props extends FormControlOptions {
  docId: string
  value: string
  placeholder?: string
  autoFocus?: boolean
  readOnly?: boolean
  minH?: string
  maxH?: string
  saveEvery?: number // Save every X ms if focused
  onSave?(value: string): void
  onFocus?(): void
  onBlur?(): void
}

const CollabEditor = forwardRef<EditorHandle, Props>(
  (
    {
      docId,
      value,
      placeholder,
      autoFocus,
      readOnly,
      minH,
      maxH,
      saveEvery,
      onSave,
      onFocus,
      onBlur,
    },
    ref
  ) => {
    const currentMember = useCurrentMember()
    const localRef = useRef<EditorHandle>(null)
    const { handleUpload } = useFileUpload()
    const mentionables = useMentionables()

    useImperativeHandle(ref, () => localRef.current!, [])

    // Handle every little change in the doc
    // to save it with throttling
    const handleChange = useCallback(() => {
      if (!localRef.current) return
      const newValue = localRef.current.getValue(true)
      if (newValue === value) return
      onSave?.(newValue)
    }, [docId, value])

    const [isFocus, setIsFocus] = useState(false)

    const handleFocus = useCallback(() => {
      setIsFocus(true)
      onFocus?.()
    }, [])

    const handleBlur = useCallback(() => {
      setIsFocus(false)
      handleChange()
      onBlur?.()
    }, [handleChange])

    // Save every X ms
    useEffect(() => {
      if (!saveEvery || !isFocus) return
      const interval = setInterval(() => {
        handleChange()
      }, saveEvery)
      return () => clearInterval(interval)
    }, [saveEvery, isFocus, handleChange])

    return (
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
        minH={minH}
        maxH={maxH}
        mentionables={mentionables}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onUpload={handleUpload}
      />
    )
  }
)

CollabEditor.displayName = 'CollabEditor'

export default memo(CollabEditor)
