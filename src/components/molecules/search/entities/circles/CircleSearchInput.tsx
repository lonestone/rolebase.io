import { CircleFragment } from '@gql'
import SearchInput, { SearchInputProps } from '../../SearchInput'
import { useCircleSearchItems } from './useCircleSearchItems'

interface Props extends Omit<SearchInputProps, 'items'> {
  circles?: CircleFragment[] // If not provided, use store
  excludeIds?: string[]
  singleMember?: boolean
}

export default function CircleSearchInput({
  circles,
  excludeIds,
  singleMember,
  ...props
}: Props) {
  const items = useCircleSearchItems(circles, excludeIds, singleMember)
  return <SearchInput {...props} items={items} />
}
