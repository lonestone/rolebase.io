import { TaskEntry } from '@shared/model/task'
import { useMemo } from 'react'
import { SearchItem, SearchItemTypes } from '../../searchTypes'

export function useTaskSearchItems(
  tasks: TaskEntry[],
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
            type: SearchItemTypes.Task,
            task,
          }
        })
        .filter(Boolean) as SearchItem[],
    [tasks, excludeIds]
  )
}
