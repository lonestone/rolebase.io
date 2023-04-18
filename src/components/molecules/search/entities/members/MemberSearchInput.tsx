import { MemberFragment } from '@gql'
import useCreateMember from '@hooks/useCreateMember'
import useOrgAdmin from '@hooks/useOrgAdmin'
import SearchInput, { SearchInputProps } from '../../SearchInput'
import { useMemberSearchItems } from './useMemberSearchItems'

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
