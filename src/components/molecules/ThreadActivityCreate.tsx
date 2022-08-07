import { createActivity } from '@api/entities/activities'
import {
  Button,
  HStack,
  IconButton,
  Spacer,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import ActivityPollModal from '@components/organisms/modals/ActivityPollModal'
import DecisionEditModal from '@components/organisms/modals/DecisionEditModal'
import MeetingEditModal from '@components/organisms/modals/MeetingEditModal'
import TaskModal from '@components/organisms/modals/TaskModal'
import ThreadEditModal from '@components/organisms/modals/ThreadEditModal'
import useCurrentMember from '@hooks/useCurrentMember'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { Activity, ActivityType } from '@shared/model/activity'
import { ThreadEntry } from '@shared/model/thread'
import { Optional } from '@shared/model/types'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiArrowRightCircle,
  FiBarChart2,
  FiCalendar,
  FiCheckSquare,
  FiMessageSquare,
} from 'react-icons/fi'
import { IoMdSend } from 'react-icons/io'
import settings from 'src/settings'
import SimpleEditor from './editor/SimpleEditor'
import { EditorHandle } from './editor/useEditor'

interface Props {
  thread: ThreadEntry
}

export default function ThreadActivityCreate({ thread }: Props) {
  const { t } = useTranslation()
  const userId = useStoreState((state) => state.auth.user?.id)
  const currentMember = useCurrentMember()
  const org = useCurrentOrg()
  const editorRef = useRef<EditorHandle>(null)

  const handleCreateActivity = useCallback(
    async (
      data: Optional<Activity, 'createdAt' | 'orgId' | 'userId' | 'threadId'>
    ) => {
      if (!org || !userId) return
      return createActivity({
        orgId: org.id,
        userId,
        threadId: thread.id,
        ...data,
      })
    },
    [org?.id, userId, thread]
  )

  const handleCreated = useCallback(
    (type: ActivityType, entityId: string) =>
      handleCreateActivity({ type, entityId }),
    [handleCreateActivity]
  )

  // Send message
  const handleSubmit = useCallback(
    async (value?: string) => {
      if (!value) {
        value = editorRef.current?.getValue()
      }
      if (!value) return

      editorRef.current?.setValue('')
      try {
        await handleCreateActivity({
          type: ActivityType.Message,
          message: value.trim(),
        })
      } catch (error) {
        console.error(error)
        editorRef.current?.setValue(value)
      }
    },
    [handleCreateActivity]
  )

  // Poll
  const pollModal = useDisclosure()

  // Thread
  const threadModal = useDisclosure()
  const handleThreadCreated = useCallback(
    (id: string) => handleCreated(ActivityType.Thread, id),
    [handleCreated]
  )

  // Meeting
  const meetingModal = useDisclosure()
  const handleMeetingCreated = useCallback(
    (id: string) => handleCreated(ActivityType.Meeting, id),
    [handleCreated]
  )

  // Task
  const taskModal = useDisclosure()
  const handleTaskCreated = useCallback(
    (id: string) => handleCreated(ActivityType.Task, id),
    [handleCreated]
  )

  // Decision
  const decisionModal = useDisclosure()
  const handleDecisionCreated = useCallback(
    (id: string) => handleCreated(ActivityType.Decision, id),
    [handleCreated]
  )

  const defaultEntityDescription = t(
    'molecules.ThreadActivityCreate.defaultEntityDescription',
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
        placeholder={t('molecules.ThreadActivityCreate.placeholder')}
        value=""
        autoFocus
        maxHeight="50vh"
        onSubmit={handleSubmit}
      />

      <HStack spacing={2} my={2}>
        <Tooltip
          label={t(`molecules.ThreadActivityCreate.poll`)}
          placement="top"
          hasArrow
        >
          <IconButton
            aria-label={t(`molecules.ThreadActivityCreate.poll`)}
            size="sm"
            icon={<FiBarChart2 />}
            onClick={pollModal.onOpen}
          />
        </Tooltip>

        <Tooltip
          label={t(`molecules.ThreadActivityCreate.decision`)}
          placement="top"
          hasArrow
        >
          <IconButton
            aria-label={t(`molecules.ThreadActivityCreate.decision`)}
            size="sm"
            icon={<FiArrowRightCircle />}
            onClick={decisionModal.onOpen}
          />
        </Tooltip>

        <Tooltip
          label={t(`molecules.ThreadActivityCreate.task`)}
          placement="top"
          hasArrow
        >
          <IconButton
            aria-label={t(`molecules.ThreadActivityCreate.task`)}
            size="sm"
            icon={<FiCheckSquare />}
            onClick={taskModal.onOpen}
          />
        </Tooltip>

        <Tooltip
          label={t(`molecules.ThreadActivityCreate.meeting`)}
          placement="top"
          hasArrow
        >
          <IconButton
            aria-label={t(`molecules.ThreadActivityCreate.meeting`)}
            size="sm"
            icon={<FiCalendar />}
            onClick={meetingModal.onOpen}
          />
        </Tooltip>

        <Tooltip
          label={t(`molecules.ThreadActivityCreate.thread`)}
          placement="top"
          hasArrow
        >
          <IconButton
            aria-label={t(`molecules.ThreadActivityCreate.thread`)}
            size="sm"
            icon={<FiMessageSquare />}
            onClick={threadModal.onOpen}
          />
        </Tooltip>

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

      {pollModal.isOpen && (
        <ActivityPollModal
          threadId={thread.id}
          isOpen
          onClose={pollModal.onClose}
        />
      )}

      {threadModal.isOpen && (
        <ThreadEditModal
          defaultCircleId={thread.circleId}
          isOpen
          onCreate={handleThreadCreated}
          onClose={threadModal.onClose}
        />
      )}

      {meetingModal.isOpen && (
        <MeetingEditModal
          defaultCircleId={thread.circleId}
          isOpen
          onCreate={handleMeetingCreated}
          onClose={meetingModal.onClose}
        />
      )}

      {taskModal.isOpen && (
        <TaskModal
          defaultCircleId={thread.circleId}
          defaultMemberId={currentMember?.id}
          defaultTitle={thread.title}
          defaultDescription={defaultEntityDescription}
          isOpen
          onCreate={handleTaskCreated}
          onClose={taskModal.onClose}
        />
      )}

      {decisionModal.isOpen && (
        <DecisionEditModal
          defaultCircleId={thread.circleId}
          defaultTitle={thread.title}
          defaultDescription={defaultEntityDescription}
          isOpen
          onCreate={handleDecisionCreated}
          onClose={decisionModal.onClose}
        />
      )}
    </div>
  )
}
