import useAdmin from '@hooks/useAdmin'
import useCreateMember from '@hooks/useCreateMember'
import { MemberEntry } from '@shared/model/member'
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
  const isAdmin = useAdmin()
  const handleCreate = useCreateMember()

  return (
    <SearchInput
      {...props}
      items={items}
      placeholder={props.placeholder || t('MemberSearchInput.placeholder')}
      onCreate={isAdmin ? handleCreate : undefined}
    />
  )
}
