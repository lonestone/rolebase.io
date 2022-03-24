import { MemberEntry } from '@shared/member'
import React from 'react'
import SearchButton, { SearchButtonProps } from '../../SearchButton'
import { useMemberSearchItems } from './useMemberSearchItems'

interface Props extends Omit<SearchButtonProps, 'items'> {
  members?: MemberEntry[] // If not provided, use store
  excludeIds?: string[]
}

export default function MemberSearchButton({
  members,
  excludeIds,
  ...props
}: Props) {
  const items = useMemberSearchItems(members, excludeIds)
  return <SearchButton {...props} items={items} />
}
