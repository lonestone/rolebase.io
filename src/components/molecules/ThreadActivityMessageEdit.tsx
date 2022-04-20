import { updateActivity } from '@api/entities/activities'
import { Box, Button } from '@chakra-ui/react'
import MarkdownEditor from '@components/molecules/editor/MarkdownEditor'
import React, { useCallback, useEffect, useState } from 'react'

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
  const [message, setMessage] = useState(defaultMessage)

  // Save message
  const handleSubmit = useCallback(
    (message: string) => {
      if (message.trim() === '') {
        // Cancel if empty
      } else {
        updateActivity(id, { message })
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

  return (
    <Box mt={2}>
      <MarkdownEditor
        value={message}
        autoFocus
        onChange={setMessage}
        onSubmit={handleSubmit}
      />
      <Button size="sm" mt={2} onClick={onClose}>
        Annuler
      </Button>
      <Button
        colorScheme="blue"
        mt={2}
        ml={2}
        onClick={() => handleSubmit(message)}
      >
        Enregistrer
      </Button>
    </Box>
  )
}
