import useCreateMember from '@/member/hooks/useCreateMember'
import useOrgAdmin from '@/member/hooks/useOrgAdmin'
import { MemberFragment } from '@gql'
import React from 'react'
import { useMemberSearchItems } from '../hooks/useMemberSearchItems'
import SearchButton, { SearchButtonProps } from './SearchButton'

interface Props extends Omit<SearchButtonProps, 'items'> {
  members?: MemberFragment[] // If not provided, use store
  excludeIds?: string[]
}

export default function MemberSearchButton({
  members,
  excludeIds,
  ...props
}: Props) {
  const items = useMemberSearchItems(members, excludeIds)
  const isAdmin = useOrgAdmin()
  const handleCreate = useCreateMember()

  return (
    <SearchButton
      {...props}
      items={items}
      onCreate={isAdmin ? handleCreate : undefined}
    />
  )
}
