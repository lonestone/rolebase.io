import { subscribeTasks } from '@api/entities/tasks'
import {
  createTasksView,
  subscribeTasksView,
  updateTasksView,
} from '@api/entities/tasksViews'
import { TaskEntry, TaskStatus, TasksViewTypes } from '@shared/model/task'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useOrgId } from './useOrgId'
import useSubscription from './useSubscription'

export function useTasks(
  view: TasksViewTypes,
  filters?: {
    memberId?: string
    circleId?: string
    status?: TaskStatus
  }
) {
  const orgId = useOrgId()

  const viewId = `${view}-${filters?.memberId || ''}-${
    filters?.circleId || ''
  }-${filters?.status || ''}`

  // Subscribe to threads
  const subscribe = useMemo(() => {
    if (!orgId) return
    return subscribeTasks(
      orgId,
      filters?.memberId,
      filters?.circleId,
      filters?.status
    )
  }, [orgId, filters?.memberId, filters?.circleId, filters?.status])

  const { data, error, loading } = useSubscription(subscribe)

  // Subscribe to tasks view to get tasks order
  const { data: tasksView, loading: tasksViewLoading } = useSubscription(
    subscribeTasksView(viewId)
  )

  // Keep last changed order and changed task until tasks view is updated
  // to avoid glitch after drag and drop
  const [tasksIdsCache, setTasksIdsCache] = useState<string[]>([])
  const [changedTaskCache, setChangedTaskCache] = useState<
    TaskEntry | undefined
  >()

  useEffect(() => {
    if (!tasksView) return
    setTasksIdsCache(tasksView.tasksIds)
  }, [tasksView])

  useEffect(() => {
    if (!tasksView) return
    setChangedTaskCache(undefined)
  }, [data])

  // Sort tasks according to view
  const tasks = useMemo(() => {
    if (!data || loading || tasksViewLoading) return []
    const newTasks = [...data]

    // Replace changed task
    if (changedTaskCache) {
      const index = newTasks.findIndex(
        (task) => task.id === changedTaskCache.id
      )
      if (index !== -1) {
        newTasks[index] = changedTaskCache
      }
    }

    return newTasks.sort((a, b) => {
      const aIndex = tasksIdsCache.indexOf(a.id)
      const bIndex = tasksIdsCache.indexOf(b.id)
      return aIndex - bIndex
    })
  }, [data, tasksIdsCache, loading, tasksViewLoading])

  // Save new ordered list
  const changeOrder = useCallback(
    (tasksIds: string[], changedTask?: TaskEntry) => {
      if (!orgId) return
      setTasksIdsCache(tasksIds)
      if (changedTask) {
        setChangedTaskCache(changedTask)
      }
      if (tasksView) {
        updateTasksView(viewId, { tasksIds })
      } else {
        createTasksView({ orgId, tasksIds }, viewId)
      }
    },
    [orgId, viewId, tasksView]
  )

  return { tasks, loading: loading || tasksViewLoading, error, changeOrder }
}
