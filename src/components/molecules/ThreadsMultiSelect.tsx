import { Box, VStack } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import useThreads from '@hooks/useThreads'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'
import ThreadSearchButton from './search/entities/threads/ThreadSearchButton'
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
  const { t } = useTranslation()

  // Subscribe threads
  const { threads, loading, error } = useThreads({ circleId })

  // Prepare sortable items
  const items = useMemo(() => threadsIds.map((id) => ({ id })), [threadsIds])

  const handleAdd = useCallback(
    (id: string) => onChange?.([...threadsIds, id]),
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

      {onChange && (!max || items.length < max) ? (
        <Box mt={2}>
          <ThreadSearchButton
            threads={threads || []}
            createCircleId={circleId}
            excludeIds={threadsIds}
            size="sm"
            leftIcon={<FiPlus />}
            onSelect={handleAdd}
          >
            {max === 1
              ? t('ThreadsMultiSelect.choose')
              : t('ThreadsMultiSelect.add')}
          </ThreadSearchButton>
        </Box>
      ) : null}
    </>
  )
}
