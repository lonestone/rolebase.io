import { ThreadFragment } from '@gql'
import { truthy } from '@shared/helpers/truthy'
import { SearchTypes } from '@shared/model/search'
import { useMemo } from 'react'
import { SearchItem } from '../../searchTypes'

export function useThreadSearchItems(
  threads: ThreadFragment[],
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
            type: SearchTypes.Thread,
            title: thread.title,
          }
        })
        .filter(truthy),
    [threads, excludeIds]
  )
}
