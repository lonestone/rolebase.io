import CircleButton from '@/circle/components/CircleButton'
import ActionsMenu from '@/common/atoms/ActionsMenu'
import Loading from '@/common/atoms/Loading'
import ScrollableLayout from '@/common/atoms/ScrollableLayout'
import { Title } from '@/common/atoms/Title'
import Page404 from '@/common/pages/Page404'
import ParticipantsNumber from '@/participants/components/ParticipantsNumber'
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
  Tag,
  Tooltip,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react'
import { useUpdateThreadMutation } from '@gql'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { PrivacyIcon } from 'src/icons'
import settings from 'src/settings'
import { ThreadContext } from '../contexts/ThreadContext'
import useThreadState from '../hooks/useThreadState'
import useThreadStatus from '../hooks/useThreadStatus'
import ThreadEditModal from '../modals/ThreadEditModal'
import ThreadActivities from './ThreadActivities'
import ThreadActivityCreate from './ThreadActivityCreate'
import ThreadStatusIcon from './ThreadStatusIcon'
import { ThreadStatusMenu } from './ThreadStatusMenu'

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
    path,
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

  const title = thread?.title || '…'

  return (
    <ThreadContext.Provider value={threadState}>
      {changeTitle && <Title>{title}</Title>}

      <ScrollableLayout
        {...boxProps}
        header={
          <>
            <Wrap spacing={4} flex={1} ml={3} align="center">
              <HStack spacing={2} align="center">
                <ThreadStatusIcon
                  value={threadStatus}
                  readOnly={!canEdit}
                  onChange={setStatus}
                />

                <Heading as="h1" size="md">
                  {canEdit ? (
                    <Link href="#" onClick={editModal.onOpen}>
                      {title}
                    </Link>
                  ) : (
                    title
                  )}
                </Heading>
              </HStack>

              <Spacer />

              <HStack spacing={2}>
                {thread?.private && (
                  <Tooltip
                    label={t('ThreadContent.private', {
                      role: circle?.role.name,
                    })}
                    hasArrow
                  >
                    <PrivacyIcon size={20} />
                  </Tooltip>
                )}

                <Box>
                  {canEdit && threadStatus && !thread?.archived && (
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
                  copyLinkUrl={`${settings.url}${path}`}
                  onEdit={editModal.onOpen}
                  onDelete={!thread?.archived ? handleArchive : undefined}
                  onUnarchive={thread?.archived ? handleUnarchive : undefined}
                  ml={2}
                />
              )}
              {headerIcons}
            </Flex>
          </>
        }
        footer={
          thread && canParticipate ? (
            <ThreadActivityCreate
              thread={thread}
              w="100%"
              p={5}
              className="userflow-thread-create"
            />
          ) : undefined
        }
      >
        {loading && <Loading active center />}
        <ThreadActivities memberStatus={memberStatus} />
      </ScrollableLayout>

      {editModal.isOpen && (
        <ThreadEditModal isOpen thread={thread} onClose={editModal.onClose} />
      )}
    </ThreadContext.Provider>
  )
}
