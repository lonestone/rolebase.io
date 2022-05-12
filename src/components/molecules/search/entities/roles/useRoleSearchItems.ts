import { RoleEntry } from '@shared/model/role'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'
import { SearchItem, SearchItemTypes } from '../../searchTypes'

export function useRoleSearchItems(
  roles?: RoleEntry[],
  base?: boolean,
  excludeIds?: string[],
  singleMember?: boolean
): SearchItem[] {
  const rolesInStore = useStoreState((state) => state.roles.entries)

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
            type: SearchItemTypes.Role,
            role,
          }
        })
        .filter(Boolean) as SearchItem[]) || [],
    [roles, rolesInStore, roles, excludeIds, singleMember]
  )
}
