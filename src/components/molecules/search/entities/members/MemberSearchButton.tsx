import useAdmin from '@hooks/useAdmin'
import useCreateMember from '@hooks/useCreateMember'
import { MemberEntry } from '@shared/model/member'
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
  const isAdmin = useAdmin()
  const handleCreate = useCreateMember()

  return (
    <SearchButton
      {...props}
      items={items}
      onCreate={isAdmin ? handleCreate : undefined}
    />
  )
}
