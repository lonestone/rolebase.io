import { RoleFragment } from '@gql'
import { SearchTypes } from '@shared/model/search'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'
import { SearchItem } from '../../searchTypes'

export function useRoleSearchItems(
  roles?: RoleFragment[],
  base?: boolean,
  excludeIds?: string[],
  singleMember?: boolean
): SearchItem[] {
  const rolesInStore = useStoreState((state) => state.org.roles)

  return useMemo(
    () =>
      ((roles || rolesInStore)
        ?.map((role): SearchItem | undefined => {
          // Exclude by id
          if (excludeIds?.includes(role.id)) return

          // Exclude by base property
          if (base !== undefined && (role.base || false) !== base) {
            return
          }

          // Exclude by singleMember property
          if (
            singleMember !== undefined &&
            (role.singleMember || false) !== singleMember
          ) {
            return
          }

          return {
            id: role.id,
            text: role.name.toLowerCase(),
            type: SearchTypes.Role,
            title: role.name,
          }
        })
        .filter(Boolean) as SearchItem[]) || [],
    [roles, rolesInStore, roles, excludeIds, singleMember]
  )
}
