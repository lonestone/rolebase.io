import { Box, Button } from '@chakra-ui/react'
import { useUpdateThreadActivityMutation } from '@gql'
import useEscKey from '@hooks/useEscKey'
import SimpleEditor from '@molecules/editor/SimpleEditor'
import { ThreadActivityDataMessage } from '@shared/model/thread_activity'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

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

  // Save message
  const handleSubmit = useCallback(
    (message: string) => {
      if (message.trim() === '') {
        // Cancel if empty
      } else {
        const data: ThreadActivityDataMessage = { message }
        updateActivity({
          variables: { id, values: { data } },
        })
      }
      onClose()
    },
    [onClose]
  )

  // Stop editing on Escape key press
  useEscKey(onClose)

  return (
    <Box mt={2}>
      <SimpleEditor
        value={message}
        autoFocus
        onChange={setMessage}
        onSubmit={handleSubmit}
      />
      <Box textAlign="right">
        <Button size="sm" mt={2} onClick={onClose}>
          {t('common.cancel')}
        </Button>
        <Button
          colorScheme="blue"
          size="sm"
          mt={2}
          ml={2}
          onClick={() => handleSubmit(message)}
        >
          {t('common.save')}
        </Button>
      </Box>
    </Box>
  )
}
