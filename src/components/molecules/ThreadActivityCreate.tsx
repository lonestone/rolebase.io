import { createActivity } from '@api/entities/activities'
import { Button, HStack, Spacer } from '@chakra-ui/react'
import ActivityDecisionModal from '@components/organisms/modals/ActivityDecisionModal'
import ActivityPollModal from '@components/organisms/modals/ActivityPollModal'
import { ActivityType } from '@shared/activity'
import { ThreadEntry } from '@shared/thread'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useRef, useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import MarkdownEditor from './editor/MarkdownEditor'
import { MarkdownEditorHandle } from './editor/useMarkdownEditor'

interface Props {
  thread: ThreadEntry
}

export default function ThreadActivityCreate({ thread }: Props) {
  const userId = useStoreState((state) => state.auth.user?.id)
  const orgId = useStoreState((state) => state.orgs.currentId)
  const editorRef = useRef<MarkdownEditorHandle>(null)

  // Create modal
  const [modalType, setModalType] = useState<ActivityType | null>(null)

  const handleSubmit = useCallback(
    async (value?: string) => {
      if (!value) {
        value = editorRef.current?.getValue()
      }
      if (!value || !orgId || !userId) return

      editorRef.current?.setValue('')
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
        editorRef.current?.setValue(value)
      }
    },
    [orgId, userId]
  )

  return (
    <div>
      <MarkdownEditor
        ref={editorRef}
        placeholder="Message..."
        value=""
        autoFocus
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
          onClick={() => handleSubmit()}
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
