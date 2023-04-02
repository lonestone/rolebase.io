import CircleButton from '@atoms/CircleButton'
import Loading from '@atoms/Loading'
import { Title } from '@atoms/Title'
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  HStack,
  Spacer,
  Tag,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react'
import { ThreadContext } from '@contexts/ThreadContext'
import { useUpdateThreadMutation } from '@gql'
import useThreadState from '@hooks/useThreadState'
import ActionsMenu from '@molecules/ActionsMenu'
import ParticipantsNumber from '@molecules/ParticipantsNumber'
import ScrollableLayout from '@molecules/ScrollableLayout'
import ThreadActivityCreate from '@molecules/thread/ThreadActivityCreate'
import ThreadActivities from '@organisms/thread/ThreadActivities'
import ThreadEditModal from '@organisms/thread/ThreadEditModal'
import Page404 from '@pages/Page404'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FiMessageSquare } from 'react-icons/fi'

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

            <Wrap spacing={2} flex={1} align="center">
              <FiMessageSquare />
              <Heading as="h1" size="md">
                {thread?.title || (loading ? '…' : null)}
              </Heading>

              <Spacer />

              <HStack spacing={2}>
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
            <ThreadActivityCreate thread={thread} w="100%" />
          ) : undefined
        }
      />

      {editModal.isOpen && (
        <ThreadEditModal isOpen thread={thread} onClose={editModal.onClose} />
      )}
    </ThreadContext.Provider>
  )
}
