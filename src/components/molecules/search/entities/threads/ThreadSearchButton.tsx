import { createThread } from '@api/entities/threads'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import { ThreadEntry } from '@shared/thread'
import React, { useCallback } from 'react'
import SearchButton, { SearchButtonProps } from '../../SearchButton'
import { useThreadSearchItems } from './useThreadSearchItems'

interface Props extends Omit<SearchButtonProps, 'items'> {
  threads: ThreadEntry[] // If not provided, use store
  excludeIds?: string[]
  createCircleId?: string
}

export default function ThreadSearchButton({
  threads,
  excludeIds,
  createCircleId,
  ...props
}: Props) {
  const items = useThreadSearchItems(threads, excludeIds)
  const orgId = useOrgId()
  const currentMember = useCurrentMember()

  const handleCreate = useCallback(
    async (title: string) => {
      if (!orgId || !createCircleId || !currentMember) {
        throw new Error()
      }

      // Create member
      const thread = await createThread({
        orgId,
        title,
        circleId: createCircleId,
        initiatorMemberId: currentMember.id,
      })
      return thread.id
    },
    [orgId, createCircleId, currentMember]
  )

  return (
    <SearchButton
      {...props}
      items={items}
      onCreate={createCircleId !== undefined ? handleCreate : undefined}
    />
  )
}
