import { MemberEntry } from '@shared/model/member'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'
import { SearchItem, SearchItemTypes } from '../../searchTypes'

export function useMemberSearchItems(
  members?: MemberEntry[], // If not provided, use store
  excludeIds?: string[]
): SearchItem[] {
  const membersInStore = useStoreState((state) => state.members.entries)

  return useMemo(
    () =>
      ((members || membersInStore)
        ?.map((member): SearchItem | undefined => {
          // Exclude by id
          if (excludeIds?.includes(member.id)) return

          return {
            id: member.id,
            text: member.name.toLowerCase(),
            type: SearchItemTypes.Member,
            member,
          }
        })
        .filter(Boolean) as SearchItem[]) || [],
    [members, membersInStore, excludeIds]
  )
}
