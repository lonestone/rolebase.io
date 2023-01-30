import { MemberFragment } from '@gql'
import useCreateMember from '@hooks/useCreateMember'
import useOrgAdmin from '@hooks/useOrgAdmin'
import React from 'react'
import SearchButton, { SearchButtonProps } from '../../SearchButton'
import { useMemberSearchItems } from './useMemberSearchItems'

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
