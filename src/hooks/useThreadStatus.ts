import {
  ThreadFragment,
  Thread_Status_Enum,
  useUpdateThreadMutation,
} from '@gql'
import useCreateLog from '@hooks/useCreateLog'
import { EntityChangeType, LogType } from '@shared/model/log'
import { useCallback, useEffect, useState } from 'react'

export default function useThreadStatus(thread?: ThreadFragment) {
  const [updateThread] = useUpdateThreadMutation()
  const createLog = useCreateLog()

  const status: Thread_Status_Enum | undefined = thread?.status || undefined

  const [cachedStatus, setCachedStatus] = useState(status)

  useEffect(() => {
    if (!status) return
    setCachedStatus(status)
  }, [status])

  // Set thread status value
  const setStatus = useCallback(
    async (value: Thread_Status_Enum) => {
      if (!thread) return

      // Update local state
      setCachedStatus(value)

      // Update remote state
      updateThread({
        variables: {
          id: thread.id,
          values: {
            status: value,
          },
        },
      })

      // Record log
      await createLog({
        threadId: thread.id,
        display: {
          type: LogType.ThreadStatusUpdate,
          id: thread.id,
          name: thread.title,
          prevStatus: thread.status,
          status: value,
        },
        changes: {
          thread: [
            {
              type: EntityChangeType.Update,
              id: thread.id,
              prevData: { status: thread.status },
              newData: { status: value },
            },
          ],
        },
      })
    },
    [thread]
  )

  return {
    threadStatus: cachedStatus,
    setStatus,
  }
}
