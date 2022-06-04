import useCreateMember from '@hooks/useCreateMember'
import { useOrgRole } from '@hooks/useOrgRole'
import { MemberEntry } from '@shared/model/member'
import { ClaimRole } from '@shared/model/userClaims'
import React from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const items = useMemberSearchItems(members, excludeIds)
  const role = useOrgRole()
  const handleCreate = useCreateMember()

  return (
    <SearchInput
      {...props}
      items={items}
      placeholder={t('molecules.search.MemberSearchInput.placeholder')}
      onCreate={role === ClaimRole.Admin ? handleCreate : undefined}
    />
  )
}
