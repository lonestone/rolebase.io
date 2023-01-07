import CircleButton from '@atoms/CircleButton'
import GlassBox from '@atoms/GlassBox'
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
import { useSubscribeThreadSubscription, useUpdateThreadMutation } from '@gql'
import useCircle from '@hooks/useCircle'
import useCurrentMember from '@hooks/useCurrentMember'
import { useElementSize } from '@hooks/useElementSize'
import useOrgMember from '@hooks/useOrgMember'
import useParticipants from '@hooks/useParticipants'
import useScrollable, { ScrollPosition } from '@hooks/useScrollable'
import ActionsMenu from '@molecules/ActionsMenu'
import ParticipantsNumber from '@molecules/ParticipantsNumber'
import ThreadActivityCreate from '@molecules/thread/ThreadActivityCreate'
import ThreadActivities from '@organisms/thread/ThreadActivities'
import ThreadEditModal from '@organisms/thread/ThreadEditModal'
import Page404 from '@pages/Page404'
import { ThreadEntry } from '@shared/model/thread'
import React, { useCallback, useRef } from 'react'
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
  const currentMember = useCurrentMember()
  const isMember = useOrgMember()
  const [updateThread] = useUpdateThreadMutation()

  // Subscribe thread
  const { data, loading, error } = useSubscribeThreadSubscription({
    skip: !currentMember,
    variables: { id, memberId: currentMember?.id! },
  })
  const thread = data?.thread_by_pk as ThreadEntry
  const memberStatus = data?.thread_by_pk?.member_status[0]

  // Circle
  const circle = useCircle(thread?.circleId)

  // Participants
  const participants = useParticipants(
    thread?.circleId,
    thread?.participantsScope,
    thread?.participantsMembersIds
  )

  // Scrollable content
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const topSize = useElementSize(topRef)
  const bottomSize = useElementSize(bottomRef)
  const {
    containerRef,
    contentRef,
    isScrollable,
    scrollPosition,
    handleScroll,
  } = useScrollable()

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
    return <Page404 />
  }

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      {...boxProps}
    >
      {changeTitle && <Title>{thread?.title || '…'}</Title>}

      {loading && <Loading active center />}

      <Box
        ref={containerRef}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        px={5}
        overflow="auto"
        onScroll={handleScroll}
      >
        <Box h={`${topSize?.height}px`} />
        <ThreadContext.Provider value={thread}>
          <ThreadActivities ref={contentRef} memberStatus={memberStatus} />
        </ThreadContext.Provider>
        <Box h={`${bottomSize?.height}px`} />
      </Box>

      <GlassBox
        ref={topRef}
        display="flex"
        w="100%"
        px={5}
        py={2}
        borderBottomWidth={1}
        borderTopRadius="lg"
      >
        <Wrap spacing={2} flex={1} align="center">
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
          {isMember && (
            <ActionsMenu
              onEdit={editModal.onOpen}
              onArchive={!thread?.archived ? handleArchive : undefined}
              onUnarchive={thread?.archived ? handleUnarchive : undefined}
              ml={2}
            />
          )}
          {headerIcons}
        </Flex>
      </GlassBox>

      <Box flex={1} />

      <GlassBox
        ref={bottomRef}
        p={5}
        borderTopWidth={
          isScrollable && scrollPosition !== ScrollPosition.Bottom ? 3 : 1
        }
        borderBottomRadius="lg"
      >
        {thread && isMember && (
          <ThreadActivityCreate thread={thread} w="100%" />
        )}
      </GlassBox>

      {editModal.isOpen && (
        <ThreadEditModal isOpen thread={thread} onClose={editModal.onClose} />
      )}
    </Box>
  )
}
