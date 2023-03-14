import { ThreadFragment } from '@gql'
import useDateLocale from '@hooks/useDateLocale'
import { SearchTypes } from '@shared/model/search'
import { formatSearchDate } from '@utils/formatSearchDate'
import { useMemo } from 'react'
import { SearchItem } from '../../searchTypes'

export function useThreadSearchItems(
  threads: ThreadFragment[],
  excludeIds?: string[]
): SearchItem[] {
  const dateLocale = useDateLocale()

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
            createdAt: formatSearchDate(thread.createdAt, dateLocale),
          }
        })
        .filter(Boolean) as SearchItem[],
    [threads, excludeIds]
  )
}
