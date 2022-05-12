import { createActivity } from '@api/entities/activities'
import { Button, HStack, Spacer } from '@chakra-ui/react'
import ActivityDecisionModal from '@components/organisms/modals/ActivityDecisionModal'
import ActivityPollModal from '@components/organisms/modals/ActivityPollModal'
import { useOrgId } from '@hooks/useOrgId'
import { ActivityType } from '@shared/model/activity'
import { ThreadEntry } from '@shared/model/thread'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdSend } from 'react-icons/io'
import SimpleEditor from './editor/SimpleEditor'
import { EditorHandle } from './editor/useEditor'

interface Props {
  thread: ThreadEntry
}

export default function ThreadActivityCreate({ thread }: Props) {
  const { t } = useTranslation()
  const userId = useStoreState((state) => state.auth.user?.id)
  const orgId = useOrgId()
  const editorRef = useRef<EditorHandle>(null)

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
      <SimpleEditor
        ref={editorRef}
        placeholder={t('molecules.ThreadActivityCreate.placeholder')}
        value=""
        autoFocus
        onSubmit={handleSubmit}
      />

      <HStack spacing={2} my={2}>
        <Button size="sm" onClick={() => setModalType(ActivityType.Poll)}>
          {t(`molecules.ThreadActivityCreate.poll`)}
        </Button>
        <Button size="sm" onClick={() => setModalType(ActivityType.Decision)}>
          {t(`molecules.ThreadActivityCreate.decision`)}
        </Button>
        <Spacer />
        <Button
          colorScheme="blue"
          size="sm"
          rightIcon={<IoMdSend />}
          onClick={() => handleSubmit()}
        >
          {t(`molecules.ThreadActivityCreate.send`)}
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
