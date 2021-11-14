import { createActivity } from '@api/entities/activities'
import { Button, HStack, Spacer } from '@chakra-ui/react'
import MarkdownEditor from '@components/atoms/MarkdownEditor'
import { ActivityType } from '@shared/activity'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useState } from 'react'

interface Props {
  threadId: string
}

export default function ThreadActivityCreate({ threadId }: Props) {
  const userId = useStoreState((state) => state.auth.user?.id)
  const orgId = useStoreState((state) => state.orgs.currentId)
  const [message, setMessage] = useState('')

  const handleSubmit = useCallback(
    async (value: string) => {
      if (!orgId || !userId) return
      setMessage('')
      try {
        await createActivity({
          orgId,
          userId,
          threadId,
          type: ActivityType.Message,
          message: value.trim(),
        })
      } catch (error) {
        console.error(error)
        setMessage(value)
      }
    },
    [orgId, userId]
  )

  return (
    <div>
      <MarkdownEditor
        placeholder="Message..."
        value={message}
        onChange={setMessage}
        onSubmit={handleSubmit}
      />

      <HStack spacing={2} my={2}>
        <Button size="sm">Réunion</Button>
        <Button size="sm">Proposition</Button>
        <Button size="sm">Election</Button>
        <Button size="sm">Sondage</Button>
        <Button size="sm">Décision</Button>
        <Spacer />
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => handleSubmit(message)}
        >
          Envoyer
        </Button>
      </HStack>
    </div>
  )
}
