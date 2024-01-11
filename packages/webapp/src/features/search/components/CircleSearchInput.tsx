import { CircleFragment } from '@gql'
import React from 'react'
import { useCircleSearchItems } from '../hooks/useCircleSearchItems'
import SearchInput, { SearchInputProps } from './SearchInput'

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
