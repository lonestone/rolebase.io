import { RoleEntry } from '@shared/model/role'
import React from 'react'
import SearchButton, { SearchButtonProps } from '../../SearchButton'
import { useRoleSearchItems } from './useRoleSearchItems'

interface Props extends Omit<SearchButtonProps, 'items'> {
  roles?: RoleEntry[] // If not provided, use store
  base?: boolean // If provided, filter by base
  singleMember?: boolean // If provided, filter by singleMember
  excludeIds?: string[]
}

export default function RoleSearchButton({
  roles,
  base,
  singleMember,
  excludeIds,
  ...props
}: Props) {
  const items = useRoleSearchItems(roles, base, excludeIds, singleMember)
  return <SearchButton {...props} items={items} />
}
