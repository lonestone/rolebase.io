import { CircleEntry } from '@shared/model/circle'
import React from 'react'
import SearchButton, { SearchButtonProps } from '../../SearchButton'
import { useCircleSearchItems } from './useCircleSearchItems'

interface Props extends Omit<SearchButtonProps, 'items'> {
  circles?: CircleEntry[] // If not provided, use store
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
