import IconTextButton from '@atoms/IconTextButton'
import {
  Box,
  BoxProps,
  Button,
  HStack,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import {
  ThreadFragment,
  Thread_Activity_Insert_Input,
  Thread_Activity_Type_Enum,
  useCreateThreadActivityMutation,
} from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import useCurrentOrg from '@hooks/useCurrentOrg'
import useSuperAdmin from '@hooks/useSuperAdmin'
import { useUserId } from '@nhost/react'
import DecisionEditModal from '@organisms/decision/DecisionEditModal'
import MeetingEditModal from '@organisms/meeting/MeetingEditModal'
import TaskModal from '@organisms/task/TaskModal'
import ActivityPollModal from '@organisms/thread/ActivityPollModal'
import ThreadEditModal from '@organisms/thread/ThreadEditModal'
import { getOrgPath } from '@shared/helpers/getOrgPath'
import { cmdOrCtrlKey } from '@utils/env'
import { UserLocalStorageKeys } from '@utils/localStorage'
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
import settings from 'src/settings'
import { EditorHandle } from '../editor'
import SimpleEditor from '../editor/SimpleEditor'

interface Props extends BoxProps {
  thread: ThreadFragment
}

export default function ThreadActivityCreate({ thread, ...boxProps }: Props) {
  const { t } = useTranslation()
  const userId = useUserId()
  const isSuperAdmin = useSuperAdmin()
  const currentMember = useCurrentMember()
  const org = useCurrentOrg()
  const [createThreadActivity] = useCreateThreadActivityMutation()
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
    setTimeout(() => {
      editorRef.current?.setValue(draft)
      editorRef.current?.editor.focus()
    }, 100)
  }, [draftKey])

  // Create a new activity
  const handleCreateActivity = useCallback(
    async (activity: Thread_Activity_Insert_Input) => {
      if (!org || !userId) return

      // Create activity
      await createThreadActivity({
        variables: {
          values: {
            userId: isSuperAdmin ? userId : undefined,
            threadId: thread.id,
            data: {},
            ...activity,
          },
        },
      })
    },
    [org?.id, isSuperAdmin, userId, thread]
  )

  // Send message
  const handleSubmit = useCallback(async () => {
    if (!editorRef.current || editorRef.current?.isEmpty()) {
      return
    }

    // Get value
    const value = editorRef.current.getValue()

    const message = JSON.parse(value).root.children[0].children[0].text

    // Clear editor
    editorRef.current?.clear()
    localStorage.setItem(draftKey, '')

    // Create message activity
    try {
      await handleCreateActivity({
        type: Thread_Activity_Type_Enum.Message,
        data: {
          message,
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
    | Thread_Activity_Type_Enum.Thread
    | Thread_Activity_Type_Enum.Meeting
    | Thread_Activity_Type_Enum.Task
    | Thread_Activity_Type_Enum.Decision
  >(Thread_Activity_Type_Enum.Thread)
  const entityModal = useDisclosure()

  const handleEntityOpen = useCallback(
    (event: MouseEvent<HTMLButtonElement> | Thread_Activity_Type_Enum) => {
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
    (id: string) => {
      const refField = `ref${entityType}Id`
      handleCreateActivity({ type: entityType, [refField]: id })
    },
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
    <Box {...boxProps}>
      <SimpleEditor
        ref={editorRef}
        placeholder={t('ThreadActivityCreate.placeholder')}
        value=""
        autoFocus
        maxH="50vh"
        onChange={handleSaveDraft}
        onSubmit={handleSubmit}
      />

      <HStack spacing={2} mt={2}>
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
          data-type={Thread_Activity_Type_Enum.Decision}
          onClick={handleEntityOpen}
        />

        <IconTextButton
          aria-label={t(`common.createTask`)}
          size="sm"
          icon={<FiCheckSquare />}
          data-type={Thread_Activity_Type_Enum.Task}
          onClick={handleEntityOpen}
        />

        <IconTextButton
          aria-label={t(`common.createMeeting`)}
          size="sm"
          icon={<FiCalendar />}
          data-type={Thread_Activity_Type_Enum.Meeting}
          onClick={handleEntityOpen}
        />

        <IconTextButton
          aria-label={t(`common.createThread`)}
          size="sm"
          icon={<FiMessageSquare />}
          data-type={Thread_Activity_Type_Enum.Thread}
          onClick={handleEntityOpen}
        />

        <Spacer />

        <Text
          color="gray.500"
          _dark={{ color: 'gray.300' }}
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
          {entityType === Thread_Activity_Type_Enum.Thread && (
            <ThreadEditModal
              defaultCircleId={thread.circleId}
              isOpen
              onCreate={handleEntityCreated}
              onClose={entityModal.onClose}
            />
          )}

          {entityType === Thread_Activity_Type_Enum.Meeting && (
            <MeetingEditModal
              defaultCircleId={thread.circleId}
              isOpen
              onCreate={handleEntityCreated}
              onClose={entityModal.onClose}
            />
          )}

          {entityType === Thread_Activity_Type_Enum.Task && (
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

          {entityType === Thread_Activity_Type_Enum.Decision && (
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
    </Box>
  )
}
