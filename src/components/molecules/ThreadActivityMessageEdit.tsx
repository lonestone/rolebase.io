import { Box, Button } from '@chakra-ui/react'
import SimpleEditor from '@components/molecules/editor/SimpleEditor'
import { ActivityMessage } from '@shared/model/thread_activity'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUpdateThreadActivityMutation } from 'src/graphql.generated'
import { EditorHandle } from './editor2/plugins/EditorRefPlugin'

interface Props {
  id: string
  defaultMessage: string
  onClose(): void
}

export default function ThreadActivityMessageEdit({
  id,
  defaultMessage,
  onClose,
}: Props) {
  const { t } = useTranslation()
  const [message, setMessage] = useState(defaultMessage)
  const [updateActivity] = useUpdateThreadActivityMutation()
  const editorRef = useRef<EditorHandle>(null)

  // Save message
  const handleSubmit = useCallback(
    (message: string) => {
      if (message.trim() === '') {
        // Cancel if empty
      } else {
        const values: Partial<ActivityMessage> = { data: { message } }
        updateActivity({
          variables: { id, values },
        })
      }
      onClose()
    },
    [onClose]
  )

  // Stop editing on Escape key press
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     editorRef.current?.editor.focus()
  //   }, 0)
  // }, [])

  return (
    <Box mt={2}>
      <SimpleEditor
        ref={editorRef}
        value={message}
        autoFocus
        onChange={setMessage}
        onSubmit={handleSubmit}
      />
      <Button size="sm" mt={2} onClick={onClose}>
        {t('common.cancel')}
      </Button>
      <Button
        colorScheme="blue"
        mt={2}
        ml={2}
        onClick={() => handleSubmit(message)}
      >
        {t('common.save')}
      </Button>
    </Box>
  )
}
