import { ThreadEntry } from '@shared/thread'
import React from 'react'
import SearchButton, { SearchButtonProps } from '../../SearchButton'
import { useThreadSearchItems } from './useThreadSearchItems'

interface Props extends Omit<SearchButtonProps, 'items'> {
  threads: ThreadEntry[] // If not provided, use store
  excludeIds?: string[]
}

export default function ThreadSearchButton({
  threads,
  excludeIds,
  ...props
}: Props) {
  const items = useThreadSearchItems(threads, excludeIds)
  return <SearchButton {...props} items={items} />
}
