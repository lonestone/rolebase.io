import { RoleFragment } from '@gql'
import React from 'react'
import { useBaseRoleSearchItems } from '../hooks/useBaseRoleSearchItems'
import SearchButton, { SearchButtonProps } from './SearchButton'

interface Props extends Omit<SearchButtonProps, 'items'> {
  roles?: RoleFragment[] // If not provided, use store
  parentLink?: boolean // If provided, filter by base
  excludeIds?: string[]
}

export default function BaseRoleSearchButton({
  roles,
  parentLink,
  excludeIds,
  ...props
}: Props) {
  const items = useBaseRoleSearchItems(roles, excludeIds, parentLink)
  return <SearchButton {...props} items={items} />
}
