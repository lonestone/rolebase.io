import { ThreadEntry } from '@shared/model/thread'
import { useMemo } from 'react'
import { SearchItem, SearchItemTypes } from '../../searchTypes'

export function useThreadSearchItems(
  threads: ThreadEntry[],
  excludeIds?: string[]
): SearchItem[] {
  return useMemo(
    () =>
      threads
        .map((thread): SearchItem | undefined => {
          // Exclude by id
          if (excludeIds?.includes(thread.id)) return

          return {
            id: thread.id,
            text: thread.title.toLowerCase(),
            type: SearchItemTypes.Thread,
            thread,
          }
        })
        .filter(Boolean) as SearchItem[],
    [threads, excludeIds]
  )
}
