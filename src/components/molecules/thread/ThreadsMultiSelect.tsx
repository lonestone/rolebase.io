import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Button, HStack, VStack } from '@chakra-ui/react'
import useThreads from '@hooks/useThreads'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaRandom } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import ThreadSearchButton from '../search/entities/threads/ThreadSearchButton'
import SortableList from '../SortableList'
import ThreadSortableItem from './ThreadSortableItem'

interface Props {
  circleId?: string
  threadsIds: string[]
  onChange?(threadsIds: string[]): void
}

export default function ThreadsMultiSelect({
  circleId,
  threadsIds,
  onChange,
}: Props) {
  const { t } = useTranslation()

  // Cache of threads ids for optimistic UI
  const [threadsIdsCache, setThreadsIdsCache] = useState(threadsIds)

  useEffect(() => {
    setThreadsIdsCache(threadsIds)
  }, [threadsIds])

  // Subscribe threads
  const { threads, loading, error } = useThreads({ circleId })

  // Prepare sortable items
  const items = useMemo(
    () => threadsIdsCache.map((id) => ({ id })),
    [threadsIdsCache]
  )

  const handleChange = useCallback(
    (ids: string[]) => {
      setThreadsIdsCache(ids)
      onChange?.(ids)
    },
    [onChange]
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
    const newThreadsIds = [...threadsIdsCache].sort(() => Math.random() - 0.5)
    handleChange?.(newThreadsIds)
  }, [threadsIdsCache, handleChange])

  return (
    <>
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      <VStack spacing={0} align="stretch">
        <SortableList disabled={!onChange} onDragEnd={handleDragEnd}>
          {items.map((item, i) => (
            <ThreadSortableItem
              key={item.id}
              threadId={item.id}
              index={i}
              onRemove={onChange && handleRemove}
            />
          ))}
        </SortableList>
      </VStack>

      {onChange && (
        <HStack mt={2}>
          <ThreadSearchButton
            threads={threads || []}
            createCircleId={circleId}
            excludeIds={threadsIds}
            size="sm"
            leftIcon={<FiPlus />}
            onSelect={handleAdd}
          >
            {t('ThreadsMultiSelect.add')}
          </ThreadSearchButton>

          {items.length > 2 && (
            <Button size="sm" leftIcon={<FaRandom />} onClick={handleRandomize}>
              {t('ThreadsMultiSelect.randomize')}
            </Button>
          )}
        </HStack>
      )}
    </>
  )
}
