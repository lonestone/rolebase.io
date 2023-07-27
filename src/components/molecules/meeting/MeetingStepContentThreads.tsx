import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Box, Button, HStack } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import {
  useCircleThreadsSubscription,
  useThreadsWithMeetingNoteSubscription,
  useUpdateMeetingStepMutation,
} from '@gql'
import { MeetingStepThreadsFragment } from '@shared/model/meeting_step'
import { shuffleArray } from '@utils/shuffleArray'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaRandom } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import SortableList from '../SortableList'
import ThreadSearchButton from '../search/entities/threads/ThreadSearchButton'
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

  // Subscribe to selected threads
  const { data, error, loading } = useThreadsWithMeetingNoteSubscription({
    skip: !step.data.threadsIds || step.data.threadsIds.length === 0,
    fetchPolicy: 'cache-first',
    variables: {
      threadsIds: step.data.threadsIds
        // Sort ids to prevent from reloading when changing order
        .slice()
        .sort((a, b) => a.localeCompare(b)),
      meetingId: step.meetingId,
    },
  })

  // Prepare sortable items
  // We use a state because subscription resets data when variables change
  const [threads, setThreads] = useState<CircleThreadWithMeetingNote[]>()
  useEffect(() => {
    if (loading || !data?.thread) return
    setThreads(
      threadsIdsCache
        .map((id) => data?.thread.find((thread) => thread.id === id))
        .filter(Boolean) as CircleThreadWithMeetingNote[]
    )
  }, [data, threadsIdsCache, loading])

  // Subscribe to all threads of circle
  const { data: threadsData } = useCircleThreadsSubscription({
    skip: !circle,
    variables: {
      circleId: circle?.id!,
    },
  })
  const threadsAll = threadsData?.thread || []

  const handleChange = useCallback(
    (threadsIds: string[]) => {
      setThreadsIdsCache(threadsIds)
      updateMeetingStep({
        variables: {
          id: step.id,
          values: {
            data: {
              threadsIds,
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
      <TextErrors errors={[error]} />

      <SortableList disabled={!editable} onDragEnd={handleDragEnd}>
        {threads?.map((item, i) => (
          <MeetingStepContentThreadItem
            key={item.id}
            thread={item}
            index={i}
            onRemove={editable ? () => handleRemove(item.id) : undefined}
          />
        ))}
      </SortableList>

      {editable && (
        <HStack mt={5}>
          <ThreadSearchButton
            threads={threadsAll}
            createCircleId={circle.id}
            excludeIds={threadsIdsCache}
            size="sm"
            leftIcon={<FiPlus />}
            onSelect={handleAdd}
          >
            {t('MeetingStepContentThreads.add')}
          </ThreadSearchButton>

          {threads && threads.length > 2 && (
            <Button size="sm" leftIcon={<FaRandom />} onClick={handleRandomize}>
              {t('MeetingStepContentThreads.randomize')}
            </Button>
          )}

          {loading && <Loading active size="sm" />}
        </HStack>
      )}
    </Box>
  )
}
