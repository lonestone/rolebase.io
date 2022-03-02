import {
  subscribeAllThreads,
  subscribeThreadsByCircle,
} from '@api/entities/threads'
import { Box, VStack } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import useSubscription from '@hooks/useSubscription'
import { ThreadEntry } from '@shared/thread'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import SearchButtonCombobox from './search/SearchButtonCombobox'
import { SearchItem, SearchItemTypes } from './search/searchItems'
import SortableList from './SortableList'
import ThreadSortableItem from './ThreadSortableItem'

interface Props {
  circleId?: string
  threadsIds: string[]
  max?: number
  onChange?(threadsIds: string[]): void
}

export default function ThreadsMultiSelect({
  circleId,
  threadsIds,
  max,
  onChange,
}: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)

  // Subscribe threads
  const subscribe = orgId
    ? circleId
      ? subscribeThreadsByCircle(orgId, circleId, false)
      : subscribeAllThreads(orgId, false)
    : undefined
  const { data: threads, loading, error } = useSubscription(subscribe)

  // Get selected threads
  const selectedThreads = useMemo(
    () =>
      threadsIds
        .map((id) => threads?.find((m) => m.id === id))
        .filter(Boolean) as ThreadEntry[],
    [threadsIds, threads]
  )

  const handleAdd = useCallback(
    (item: SearchItem) => {
      if (item.type === SearchItemTypes.Thread) {
        onChange?.([...threadsIds, item.thread.id])
      }
    },
    [threadsIds, onChange]
  )

  const handleRemove = useCallback(
    (threadId: string) => {
      onChange?.(threadsIds.filter((id) => id !== threadId))
    },
    [threadsIds, onChange]
  )

  const handleDragEnd = useCallback(
    (oldIndex: number, newIndex: number) => {
      const newThreadsIds = [...threadsIds]
      newThreadsIds.splice(newIndex, 0, newThreadsIds.splice(oldIndex, 1)[0])
      onChange?.(newThreadsIds)
    },
    [threadsIds, onChange]
  )

  return (
    <>
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      <VStack spacing={0} align="stretch">
        <SortableList items={selectedThreads} onDragEnd={handleDragEnd}>
          {selectedThreads.map((thread) => (
            <ThreadSortableItem
              key={thread.id}
              thread={thread}
              onRemove={onChange && handleRemove}
              disabled={typeof onChange !== 'undefined' ? true : false}
            />
          ))}
        </SortableList>
      </VStack>

      {onChange && (!max || selectedThreads.length < max) ? (
        <Box mt={2}>
          <SearchButtonCombobox
            threads
            threadsOverride={threads}
            excludeIds={threadsIds}
            size="sm"
            leftIcon={<FiPlus />}
            onSelect={handleAdd}
          >
            {max === 1 ? 'Choisir une discussion' : 'Ajouter une discussion'}
          </SearchButtonCombobox>
        </Box>
      ) : null}
    </>
  )
}
