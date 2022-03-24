import { MemberEntry } from '@shared/member'
import React from 'react'
import SearchInput, { SearchInputProps } from '../../SearchInput'
import { useMemberSearchItems } from './useMemberSearchItems'

interface Props extends Omit<SearchInputProps, 'items'> {
  members?: MemberEntry[] // If not provided, use store
  excludeIds?: string[]
}

export default function MemberSearchInput({
  members,
  excludeIds,
  ...props
}: Props) {
  const items = useMemberSearchItems(members, excludeIds)
  return <SearchInput {...props} items={items} />
}
