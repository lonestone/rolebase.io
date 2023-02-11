import { MemberFragment } from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import { SearchTypes } from '@shared/model/search'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'
import { SearchItem } from '../../searchTypes'

export function useMemberSearchItems(
  members?: MemberFragment[], // If not provided, use store
  excludeIds?: string[]
): SearchItem[] {
  const currentMember = useCurrentMember()
  const membersInStore = useStoreState((state) => state.org.members)

  return useMemo(
    () =>
      ((members || membersInStore)
        ?.map((member): SearchItem | undefined => {
          // Exclude by id
          if (excludeIds?.includes(member.id)) return

          return {
            id: member.id,
            text: member.name.toLowerCase(),
            type: SearchTypes.Member,
            title: member.name,
            picture: member.picture || undefined,
          }
        })
        .sort((a, b) => {
          if (!a || !b) return 0
          // Position current member at the top
          if (currentMember) {
            if (a.id === currentMember.id) return -1
            if (b.id === currentMember.id) return 1
          }
          return a.text.localeCompare(b.text)
        })
        .filter(Boolean) as SearchItem[]) || [],
    [members, membersInStore, excludeIds, currentMember]
  )
}
