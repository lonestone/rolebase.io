import { createActivity } from '@api/entities/activities'
import { Button, HStack, Spacer } from '@chakra-ui/react'
import MarkdownEditor from '@components/atoms/MarkdownEditor'
import ActivityDecisionCreateModal from '@components/organisms/modals/ActivityDecisionCreateModal'
import { ActivityType } from '@shared/activity'
import { ThreadEntry } from '@shared/thread'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useState } from 'react'

interface Props {
  thread: ThreadEntry
}

export default function ThreadActivityCreate({ thread }: Props) {
  const userId = useStoreState((state) => state.auth.user?.id)
  const orgId = useStoreState((state) => state.orgs.currentId)
  const [message, setMessage] = useState('')

  // Create modal
  const [modalType, setModalType] = useState<ActivityType | null>(null)

  const handleSubmit = useCallback(
    async (value: string) => {
      if (!orgId || !userId) return
      setMessage('')
      try {
        await createActivity({
          orgId,
          userId,
          threadId: thread.id,
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
        <Button size="sm" onClick={() => setModalType(ActivityType.Meeting)}>
          Réunion
        </Button>
        <Button size="sm" onClick={() => setModalType(ActivityType.Proposal)}>
          Proposition
        </Button>
        <Button size="sm" onClick={() => setModalType(ActivityType.Election)}>
          Election
        </Button>
        <Button size="sm" onClick={() => setModalType(ActivityType.Poll)}>
          Sondage
        </Button>
        <Button size="sm" onClick={() => setModalType(ActivityType.Decision)}>
          Décision
        </Button>
        <Spacer />
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => handleSubmit(message)}
        >
          Envoyer
        </Button>
      </HStack>

      <ActivityDecisionCreateModal
        threadId={thread.id}
        circleId={thread.circleId}
        isOpen={modalType === ActivityType.Decision}
        onClose={() => setModalType(null)}
      />
    </div>
  )
}
