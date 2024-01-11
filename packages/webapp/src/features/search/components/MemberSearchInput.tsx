import useCreateMember from '@/member/hooks/useCreateMember'
import useOrgAdmin from '@/member/hooks/useOrgAdmin'
import { MemberFragment } from '@gql'
import React from 'react'
import { useMemberSearchItems } from '../hooks/useMemberSearchItems'
import SearchInput, { SearchInputProps } from './SearchInput'

interface Props extends Omit<SearchInputProps, 'items'> {
  members?: MemberFragment[] // If not provided, use store
  excludeIds?: string[]
}

export default function MemberSearchInput({
  members,
  excludeIds,
  ...props
}: Props) {
  const items = useMemberSearchItems(members, excludeIds)
  const isAdmin = useOrgAdmin()
  const handleCreate = useCreateMember()

  return (
    <SearchInput
      {...props}
      items={items}
      onCreate={isAdmin ? handleCreate : undefined}
    />
  )
}
