import { TaskEntry } from '@shared/task'
import { useMemo } from 'react'

export function useSortedTasks(tasks: TaskEntry[] | undefined) {
  return useMemo(() => {
    if (!tasks) return []
    return tasks.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return a.dueDate.seconds < b.dueDate.seconds ? -1 : 1
    })
  }, [tasks])
}
