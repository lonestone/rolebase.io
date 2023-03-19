import { RoleFragment } from '@gql'
import React from 'react'
import SearchButton, { SearchButtonProps } from '../../SearchButton'
import { useRoleSearchItems } from './useRoleSearchItems'

interface Props extends Omit<SearchButtonProps, 'items'> {
  roles?: RoleFragment[] // If not provided, use store
  base?: boolean // If provided, filter by base
  singleMember?: boolean // If provided, filter by singleMember
  excludeIds?: string[]
}

export default function RoleSearchButton({
  roles,
  singleMember,
  excludeIds,
  ...props
}: Props) {
  const items = useRoleSearchItems(roles, excludeIds, singleMember)
  return <SearchButton {...props} items={items} />
}
