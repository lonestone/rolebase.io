import useCreateMember from '@hooks/useCreateMember'
import { useOrgRole } from '@hooks/useOrgRole'
import { MemberEntry } from '@shared/model/member'
import { ClaimRole } from '@shared/model/userClaims'
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
  const role = useOrgRole()
  const handleCreate = useCreateMember()

  return (
    <SearchButton
      {...props}
      items={items}
      onCreate={role === ClaimRole.Admin ? handleCreate : undefined}
    />
  )
}
