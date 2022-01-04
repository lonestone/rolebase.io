import {
  subscribeAllThreads,
  subscribeThreadsByCircle,
} from '@api/entities/threads'
import { CloseIcon } from '@chakra-ui/icons'
import { Box, HStack, IconButton, LinkBox, VStack } from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import ThreadLinkOverlay from '@components/atoms/ThreadLinkOverlay'
import useSubscription from '@hooks/useSubscription'
import { ThreadEntry } from '@shared/thread'
import { useStoreState } from '@store/hooks'
import React, { useCallback, useMemo } from 'react'
import { FiMessageSquare, FiPlus } from 'react-icons/fi'
import SearchButtonCombobox from './search/SearchButtonCombobox'
import { SearchItem, SearchItemTypes } from './search/searchItems'

interface Props {
  circleId?: string
  threadsIds: string[]
  max?: number
  onAdd?(memberId: string): void
  onRemove?(memberId: string): void
}

export default function ThreadsMultiSelect({
  circleId,
  threadsIds,
  max,
  onAdd,
  onRemove,
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
        onAdd?.(item.thread.id)
      }
    },
    [onAdd]
  )

  return (
    <>
      {loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      <VStack spacing={0} align="stretch">
        {selectedThreads.map((thread) => (
          <LinkBox
            key={thread.id}
            px={2}
            py={1}
            _hover={{ background: '#fafafa' }}
          >
            <HStack spacing={3} align="stretch" alignItems="center">
              <FiMessageSquare />
              <ThreadLinkOverlay thread={thread} />

              {onRemove && (
                <IconButton
                  aria-label=""
                  size="sm"
                  icon={<CloseIcon />}
                  onClick={() => onRemove(thread.id)}
                />
              )}
            </HStack>
          </LinkBox>
        ))}
      </VStack>

      {onAdd && (!max || selectedThreads.length < max) ? (
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
