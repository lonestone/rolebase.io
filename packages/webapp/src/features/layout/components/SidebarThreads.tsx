import useCurrentMember from '@/member/hooks/useCurrentMember'
import ThreadsList from '@/thread/components/ThreadsList'
import useFilterThreadsByMember from '@/thread/hooks/useFilterThreadsByMember'
import useThreads from '@/thread/hooks/useThreads'
import React from 'react'
import { sidebarSubItemProps } from './SidebarItem'
import SidebarItemsContainer from './SidebarItemsContainer'

export default function SidebarThreads() {
  const currentMember = useCurrentMember()

  // Subscribe to threads
  const { threads, loading } = useThreads()

  // Filter threads
  const filteredThreads = useFilterThreadsByMember(threads, currentMember?.id)

  // Don't show card if empty or loading
  const hasItems = !!(currentMember && !loading && filteredThreads?.length)

  return (
    <SidebarItemsContainer hasItems={hasItems}>
      {filteredThreads && (
        <ThreadsList
          threads={filteredThreads}
          noModal
          max={5}
          itemProps={sidebarSubItemProps}
        />
      )}
    </SidebarItemsContainer>
  )
}
