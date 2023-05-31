import CircleButton from '@atoms/CircleButton'
import Loading from '@atoms/Loading'
import { Title } from '@atoms/Title'
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  HStack,
  Tag,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react'
import { ThreadContext } from '@contexts/ThreadContext'
import { useUpdateThreadMutation } from '@gql'
import useOrgMember from '@hooks/useOrgMember'
import useThreadState from '@hooks/useThreadState'
import useThreadStatus from '@hooks/useThreadStatus'
import ActionsMenu from '@molecules/ActionsMenu'
import { CircleThreadStatus } from '@molecules/CircleThreadStatus'
import ParticipantsNumber from '@molecules/ParticipantsNumber'
import ScrollableLayout from '@molecules/ScrollableLayout'
import ThreadActivityCreate from '@molecules/thread/ThreadActivityCreate'
import { ThreadStatusMenu } from '@molecules/thread/ThreadStatusMenu'
import ThreadActivities from '@organisms/thread/ThreadActivities'
import ThreadEditModal from '@organisms/thread/ThreadEditModal'
import Page404 from '@pages/Page404'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface Props extends BoxProps {
  id: string
  changeTitle?: boolean
  headerIcons?: React.ReactNode
}

export default function ThreadContent({
  id,
  changeTitle,
  headerIcons,
  ...boxProps
}: Props) {
  const { t } = useTranslation()
  const [updateThread] = useUpdateThreadMutation()
  const isMember = useOrgMember()

  // Load thread and activities
  const threadState = useThreadState(id)

  const {
    thread,
    memberStatus,
    loading,
    error,
    circle,
    participants,
    canEdit,
    canParticipate,
  } = threadState

  // Create modal
  const editModal = useDisclosure()

  const { threadStatus, setStatus } = useThreadStatus(thread)

  // Archive / unarchive
  const handleArchive = useCallback(
    () => updateThread({ variables: { id, values: { archived: true } } }),
    [id]
  )
  const handleUnarchive = useCallback(
    () => updateThread({ variables: { id, values: { archived: false } } }),
    [id]
  )

  if (error) {
    console.error(error)
    return <Page404 />
  }

  return (
    <ThreadContext.Provider value={threadState}>
      <ScrollableLayout
        {...boxProps}
        header={
          <>
            {changeTitle && <Title>{thread?.title || '…'}</Title>}

            <Wrap spacing={4} flex={1} align="center">
              <Flex gap={2}>
                {isMember && threadStatus && (
                  <CircleThreadStatus status={threadStatus} />
                )}

                <Heading as="h1" size="md">
                  {thread?.title || (loading ? '…' : null)}
                </Heading>
              </Flex>

              <HStack spacing={2}>
                <Box>
                  {isMember && (
                    <ThreadStatusMenu
                      value={threadStatus}
                      onChange={setStatus}
                    />
                  )}
                </Box>

                {thread?.archived && <Tag>{t('common.archived')}</Tag>}

                {circle && <CircleButton circle={circle} />}

                <Box>
                  <ParticipantsNumber participants={participants} />
                </Box>
              </HStack>
            </Wrap>

            <Flex mr={headerIcons ? -2 : 0}>
              {canEdit && (
                <ActionsMenu
                  onEdit={editModal.onOpen}
                  onArchive={!thread?.archived ? handleArchive : undefined}
                  onUnarchive={thread?.archived ? handleUnarchive : undefined}
                  ml={2}
                />
              )}
              {headerIcons}
            </Flex>
          </>
        }
        content={
          <>
            {loading && <Loading active center />}
            <ThreadActivities memberStatus={memberStatus} />
          </>
        }
        footer={
          thread && canParticipate ? (
            <ThreadActivityCreate
              thread={thread}
              w="100%"
              className="userflow-thread-create"
            />
          ) : undefined
        }
      />
      {editModal.isOpen && (
        <ThreadEditModal isOpen thread={thread} onClose={editModal.onClose} />
      )}
    </ThreadContext.Provider>
  )
}
