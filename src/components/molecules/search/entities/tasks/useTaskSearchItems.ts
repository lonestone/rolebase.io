import { TaskFragment } from '@gql'
import { SearchTypes } from '@shared/model/search'
import { useMemo } from 'react'
import { SearchItem } from '../../searchTypes'

export function useTaskSearchItems(
  tasks: TaskFragment[],
  excludeIds?: string[]
): SearchItem[] {
  return useMemo(
    () =>
      tasks
        .map((task): SearchItem | undefined => {
          // Exclude by id
          if (excludeIds?.includes(task.id)) return

          return {
            id: task.id,
            text: task.title.toLowerCase(),
            type: SearchTypes.Task,
            title: task.title,
          }
        })
        .filter(Boolean) as SearchItem[],
    [tasks, excludeIds]
  )
}
