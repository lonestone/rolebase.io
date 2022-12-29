import { Button, HStack, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import IconTextButton from '@components/atoms/IconTextButton'
import DecisionEditModal from '@components/organisms/decision/DecisionEditModal'
import MeetingEditModal from '@components/organisms/meeting/MeetingEditModal'
import TaskModal from '@components/organisms/task/TaskModal'
import ActivityPollModal from '@components/organisms/thread/ActivityPollModal'
import ThreadEditModal from '@components/organisms/thread/ThreadEditModal'
import useCurrentMember from '@hooks/useCurrentMember'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useUserId } from '@nhost/react'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { ThreadEntry } from '@shared/model/thread'
import { Activity, ActivityType } from '@shared/model/thread_activity'
import { Optional } from '@shared/model/types'
import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiArrowRightCircle,
  FiBarChart2,
  FiCalendar,
  FiCheckSquare,
  FiMessageSquare,
} from 'react-icons/fi'
import { IoMdSend } from 'react-icons/io'
import {
  useCreateThreadActivityMutation,
  useUpdateThreadMutation,
} from 'src/graphql.generated'
import settings from 'src/settings'
import { cmdOrCtrlKey } from 'src/utils/env'
import { UserLocalStorageKeys } from 'src/utils/localStorage'
import { EditorHandle } from './editor'
import SimpleEditor from './editor/SimpleEditor'

interface Props {
  thread: ThreadEntry
}

export default function ThreadActivityCreate({ thread }: Props) {
  const { t } = useTranslation()
  const userId = useUserId()
  const currentMember = useCurrentMember()
  const org = useCurrentOrg()
  const [createThreadActivity] = useCreateThreadActivityMutation()
  const [updateThread] = useUpdateThreadMutation()
  const editorRef = useRef<EditorHandle>(null)

  // Save message draft
  const draftKey = UserLocalStorageKeys.ThreadDrafts.replace('{id}', thread.id)
  const handleSaveDraft = useCallback(
    (value: string) => {
      localStorage.setItem(draftKey, value)
    },
    [draftKey]
  )

  // Restore message draft
  useEffect(() => {
    const draft = localStorage.getItem(draftKey)
    if (!draft) return
    editorRef.current?.setValue(draft)
    editorRef.current?.editor.focus()
  }, [draftKey])

  // Create a new activity
  const handleCreateActivity = useCallback(
    async (
      activity: Optional<Activity, 'createdAt' | 'userId' | 'threadId'>
    ) => {
      if (!org || !userId) return

      // Create activity
      const { data } = await createThreadActivity({
        variables: {
          values: {
            threadId: thread.id,
            ...activity,
          },
        },
      })
      const id = data?.insert_thread_activity_one?.id

      // Update thread
      await updateThread({
        variables: {
          id: thread.id,
          values: {
            lastActivityId: id,
            lastActivityDate: new Date().toISOString(),
          },
        },
      })
    },
    [org?.id, userId, thread]
  )

  // Send message
  const handleSubmit = useCallback(async () => {
    const length = editorRef.current?.getText().trim().length
    if (!length) return

    // Get value
    const value = editorRef.current?.getValue()

    // Clear editor
    editorRef.current?.clear()
    localStorage.setItem(draftKey, '')

    // Create message activity
    try {
      await handleCreateActivity({
        type: ActivityType.Message,
        data: {
          message: value,
        },
      })
    } catch (error) {
      console.error(error)
      editorRef.current?.setValue(value)
      localStorage.setItem(draftKey, value)
    }
  }, [handleCreateActivity])

  // Poll
  const pollModal = useDisclosure()

  // Thread
  const [entityType, setEntityType] = useState<
    | ActivityType.Thread
    | ActivityType.Meeting
    | ActivityType.Task
    | ActivityType.Decision
  >(ActivityType.Thread)
  const entityModal = useDisclosure()

  const handleEntityOpen = useCallback(
    (event: MouseEvent<HTMLButtonElement> | ActivityType) => {
      const type =
        typeof event === 'string'
          ? event
          : event.currentTarget.getAttribute('data-type')
      if (!type) return
      setEntityType(type as typeof entityType)
      entityModal.onOpen()
    },
    []
  )

  const handleEntityCreated = useCallback(
    (id: string) =>
      handleCreateActivity({ type: entityType, data: { entityId: id } }),
    [handleCreateActivity, entityType]
  )

  const defaultEntityDescription = t(
    'ThreadActivityCreate.defaultEntityDescription',
    {
      thread: `[${thread.title}](${settings.url}${
        org ? getOrgPath(org) : ''
      }/threads/${thread.id})`,
    }
  )

  return (
    <div>
      <SimpleEditor
        ref={editorRef}
        placeholder={t('ThreadActivityCreate.placeholder')}
        value=""
        autoFocus
        maxHeight="50vh"
        onChange={handleSaveDraft}
        onSubmit={handleSubmit}
      />

      <HStack spacing={2} my={2}>
        <IconTextButton
          aria-label={t(`ThreadActivityCreate.poll`)}
          size="sm"
          icon={<FiBarChart2 />}
          onClick={pollModal.onOpen}
        />

        <IconTextButton
          aria-label={t(`common.createDecision`)}
          size="sm"
          icon={<FiArrowRightCircle />}
          data-type={ActivityType.Decision}
          onClick={handleEntityOpen}
        />

        <IconTextButton
          aria-label={t(`common.createTask`)}
          size="sm"
          icon={<FiCheckSquare />}
          data-type={ActivityType.Task}
          onClick={handleEntityOpen}
        />

        <IconTextButton
          aria-label={t(`common.createMeeting`)}
          size="sm"
          icon={<FiCalendar />}
          data-type={ActivityType.Meeting}
          onClick={handleEntityOpen}
        />

        <IconTextButton
          aria-label={t(`common.createThread`)}
          size="sm"
          icon={<FiMessageSquare />}
          data-type={ActivityType.Thread}
          onClick={handleEntityOpen}
        />

        <Spacer />

        <Text
          color="gray.500"
          fontSize="xs"
          pr={2}
        >{`${cmdOrCtrlKey} + Enter`}</Text>

        <Button
          colorScheme="blue"
          size="sm"
          rightIcon={<IoMdSend />}
          onClick={() => handleSubmit()}
        >
          {t(`common.send`)}
        </Button>
      </HStack>

      {pollModal.isOpen && (
        <ActivityPollModal
          threadId={thread.id}
          isOpen
          onClose={pollModal.onClose}
        />
      )}

      {entityModal.isOpen && (
        <>
          {entityType === ActivityType.Thread && (
            <ThreadEditModal
              defaultCircleId={thread.circleId}
              isOpen
              onCreate={handleEntityCreated}
              onClose={entityModal.onClose}
            />
          )}

          {entityType === ActivityType.Meeting && (
            <MeetingEditModal
              defaultCircleId={thread.circleId}
              isOpen
              onCreate={handleEntityCreated}
              onClose={entityModal.onClose}
            />
          )}

          {entityType === ActivityType.Task && (
            <TaskModal
              defaultCircleId={thread.circleId}
              defaultMemberId={currentMember?.id}
              defaultTitle={thread.title}
              defaultDescription={defaultEntityDescription}
              isOpen
              onCreate={handleEntityCreated}
              onClose={entityModal.onClose}
            />
          )}

          {entityType === ActivityType.Decision && (
            <DecisionEditModal
              defaultCircleId={thread.circleId}
              defaultTitle={thread.title}
              defaultDescription={defaultEntityDescription}
              isOpen
              onCreate={handleEntityCreated}
              onClose={entityModal.onClose}
            />
          )}
        </>
      )}
    </div>
  )
}
