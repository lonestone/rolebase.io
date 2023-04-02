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
  IconButton,
  Spacer,
  Tag,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react'
import { ThreadContext } from '@contexts/ThreadContext'
import { useUpdateThreadMutation } from '@gql'
import { useElementSize } from '@hooks/useElementSize'
import useScrollable, { ScrollPosition } from '@hooks/useScrollable'
import useThreadState from '@hooks/useThreadState'
import ActionsMenu from '@molecules/ActionsMenu'
import ParticipantsNumber from '@molecules/ParticipantsNumber'
import ThreadActivityCreate from '@molecules/thread/ThreadActivityCreate'
import ThreadActivities from '@organisms/thread/ThreadActivities'
import ThreadEditModal from '@organisms/thread/ThreadEditModal'
import Page404 from '@pages/Page404'
import React, { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FiArrowDown, FiArrowUp } from 'react-icons/fi'

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
    console.error(error)
    return <Page404 />
  }

  return (
    <ThreadContext.Provider value={threadState}>
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        {...boxProps}
      >
        {changeTitle && <Title>{thread?.title || '…'}</Title>}

        {loading && <Loading active center />}

        {/* Activities in container */}
        <Box
          ref={containerRef}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          overflowY="scroll"
          onScroll={handleScroll}
        >
          <Box h={`${topSize?.height}px`} />
          <ThreadActivities ref={contentRef} memberStatus={memberStatus} />
          <Box h={`${bottomSize?.height}px`} />
        </Box>

        {/* Buttons to scroll to top/bottom */}
        {isScrollable && scrollPosition !== ScrollPosition.Top && (
          <IconButton
            aria-label="Scroll to top"
            position="absolute"
            top={`${(topSize?.height || 0) + 10}px`}
            right="30px"
            icon={<FiArrowUp />}
            onClick={() => {
              containerRef.current?.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }}
          />
        )}
        {isScrollable && scrollPosition !== ScrollPosition.Bottom && (
          <IconButton
            aria-label="Scroll to bottom"
            position="absolute"
            bottom={`${(bottomSize?.height || 0) + 10}px`}
            right="30px"
            icon={<FiArrowDown />}
            onClick={() => {
              containerRef.current?.scrollTo({
                top: containerRef.current?.scrollHeight,
                behavior: 'smooth',
              })
            }}
          />
        )}

        <GlassBox
          ref={topRef}
          display="flex"
          w="100%"
          px={5}
          py={2}
          borderBottomWidth={1}
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
        </GlassBox>

        <Box flex={1} />

        <GlassBox
          ref={bottomRef}
          p={5}
          borderTopWidth={
            isScrollable && scrollPosition !== ScrollPosition.Bottom ? 3 : 1
          }
        >
          {thread && canParticipate && (
            <ThreadActivityCreate thread={thread} w="100%" />
          )}
        </GlassBox>

        {editModal.isOpen && (
          <ThreadEditModal isOpen thread={thread} onClose={editModal.onClose} />
        )}
      </Box>
    </ThreadContext.Provider>
  )
}
