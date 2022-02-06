import { createActivity } from '@api/entities/activities'
import { Button, HStack, Spacer } from '@chakra-ui/react'
import MarkdownEditor from '@components/atoms/MarkdownEditor'
import ActivityDecisionModal from '@components/organisms/modals/ActivityDecisionModal'
import ActivityPollModal from '@components/organisms/modals/ActivityPollModal'
import { ActivityType } from '@shared/activity'
import { ThreadEntry } from '@shared/thread'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useState } from 'react'
import { IoMdSend } from 'react-icons/io'

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
      value = value.trim()
      if (!value || !orgId || !userId) return

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
        autoFocus
        onChange={setMessage}
        onSubmit={handleSubmit}
      />

      <HStack spacing={2} my={2}>
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
          rightIcon={<IoMdSend />}
          isDisabled={message.trim().length === 0}
          onClick={() => handleSubmit(message)}
        >
          Envoyer
        </Button>
      </HStack>

      {modalType === ActivityType.Decision ? (
        <ActivityDecisionModal
          threadId={thread.id}
          circleId={thread.circleId}
          isOpen
          onClose={() => setModalType(null)}
        />
      ) : modalType === ActivityType.Poll ? (
        <ActivityPollModal
          threadId={thread.id}
          isOpen
          onClose={() => setModalType(null)}
        />
      ) : null}
    </div>
  )
}
