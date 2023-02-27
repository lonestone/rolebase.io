import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import {
  useCircleThreadsWithMeetingNoteSubscription,
  useUpdateMeetingStepMutation,
} from '@gql'
import { MeetingStepThreadsFragment } from '@shared/model/meeting_step'
import { shuffleArray } from '@utils/shuffleArray'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { FaRandom } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import ThreadSearchButton from '../search/entities/threads/ThreadSearchButton'
import SortableList from '../SortableList'
import MeetingStepContentThreadItem, {
  CircleThreadWithMeetingNote,
} from './MeetingStepContentThreadItem'

interface Props {
  step: MeetingStepThreadsFragment
}

export default function MeetingStepContentThreads({ step }: Props) {
  const { t } = useTranslation()
  const { circle, editable } = useContext(MeetingContext)!
  const [updateMeetingStep] = useUpdateMeetingStepMutation()

  // Cache of threads ids for optimistic UI
  const [threadsIdsCache, setThreadsIdsCache] = useState(
    step.data.threadsIds || []
  )

  useEffect(() => {
    setThreadsIdsCache(step.data.threadsIds)
  }, [step.data.threadsIds])

  // Subscribe threads
  // Subscribe to threads
  const { data, error, loading } = useCircleThreadsWithMeetingNoteSubscription({
    skip: !circle,
    variables: {
      circleId: circle?.id!,
      meetingId: step.meetingId,
    },
  })

  const threads = data?.thread

  // Prepare sortable items
  const items = useMemo(
    () =>
      threadsIdsCache
        .map((id) => threads?.find((thread) => thread.id === id))
        .filter(Boolean) as CircleThreadWithMeetingNote[],
    [threads, threadsIdsCache]
  )

  const handleChange = useCallback(
    (ids: string[]) => {
      setThreadsIdsCache(ids)
      updateMeetingStep({
        variables: {
          id: step.id,
          values: {
            data: {
              threadsIds: ids,
            },
          },
        },
      })
    },
    [step.id]
  )

  const handleAdd = useCallback(
    (id: string) => handleChange?.([...threadsIdsCache, id]),
    [threadsIdsCache, handleChange]
  )

  const handleRemove = useCallback(
    (threadId: string) => {
      handleChange?.(threadsIdsCache.filter((id) => id !== threadId))
    },
    [threadsIdsCache, handleChange]
  )

  const handleDragEnd = useCallback(
    (oldIndex: number, newIndex: number) => {
      const newThreadsIds = [...threadsIdsCache]
      newThreadsIds.splice(newIndex, 0, newThreadsIds.splice(oldIndex, 1)[0])
      handleChange?.(newThreadsIds)
    },
    [threadsIdsCache, handleChange]
  )

  const handleRandomize = useCallback(() => {
    if (threadsIdsCache.length < 2) return
    let newThreadsIds = shuffleArray(threadsIdsCache)
    while (newThreadsIds.join('') === threadsIdsCache.join('')) {
      newThreadsIds = shuffleArray(threadsIdsCache)
    }
    handleChange?.(newThreadsIds)
  }, [threadsIdsCache, handleChange])

  if (!circle) return null

  return (
    <Box mb={5}>
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      <SortableList disabled={!editable} onDragEnd={handleDragEnd}>
        <VStack spacing={2} align="stretch">
          {items.map((item, i) => (
            <MeetingStepContentThreadItem
              key={item.id}
              thread={item}
              index={i}
              onRemove={editable ? () => handleRemove(item.id) : undefined}
            />
          ))}
        </VStack>
      </SortableList>

      {editable && (
        <HStack mt={8}>
          <ThreadSearchButton
            threads={threads || []}
            createCircleId={circle.id}
            excludeIds={threadsIdsCache}
            size="sm"
            leftIcon={<FiPlus />}
            onSelect={handleAdd}
          >
            {t('MeetingStepContentThreads.add')}
          </ThreadSearchButton>

          {items.length > 2 && (
            <Button size="sm" leftIcon={<FaRandom />} onClick={handleRandomize}>
              {t('MeetingStepContentThreads.randomize')}
            </Button>
          )}
        </HStack>
      )}
    </Box>
  )
}
