import { CircleFragment } from '@gql'
import React from 'react'
import { useCircleSearchItems } from '../hooks/useCircleSearchItems'
import SearchButton, { SearchButtonProps } from './SearchButton'

interface Props extends Omit<SearchButtonProps, 'items'> {
  circles?: CircleFragment[] // If not provided, use store
  excludeIds?: string[]
}

export default function CircleSearchButton({
  circles,
  excludeIds,
  ...props
}: Props) {
  const items = useCircleSearchItems(circles, excludeIds)
  return <SearchButton {...props} items={items} />
}
