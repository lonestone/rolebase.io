import { TaskEntry } from '@shared/task'
import React from 'react'
import SearchButton, { SearchButtonProps } from '../../SearchButton'
import { useTaskSearchItems } from './useTaskSearchItems'

interface Props extends Omit<SearchButtonProps, 'items'> {
  tasks: TaskEntry[] // If not provided, use store
  excludeIds?: string[]
}

export default function TaskSearchButton({
  tasks,
  excludeIds,
  ...props
}: Props) {
  const items = useTaskSearchItems(tasks, excludeIds)
  return <SearchButton {...props} items={items} />
}
