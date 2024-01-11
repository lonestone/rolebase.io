import { useAsyncMemo } from '@/common/hooks/useAsyncMemo'
import {
  LogFragment,
  useCancelLogMutation,
  useGetCircleLazyQuery,
  useGetCircleMemberLazyQuery,
  useGetDecisionLazyQuery,
  useGetMemberLazyQuery,
  useGetRoleLazyQuery,
  useGetTaskLazyQuery,
  useGetThreadLazyQuery,
  useUpdateCircleMemberMutation,
  useUpdateCircleMutation,
  useUpdateDecisionMutation,
  useUpdateMemberMutation,
  useUpdateRoleMutation,
  useUpdateTaskMutation,
  useUpdateThreadMutation,
} from '@gql'
import { cancelLogChanges } from '@shared/helpers/log/cancelLogChanges'
import { detectRecentEntitiesChanges } from '@shared/helpers/log/detectRecentEntitiesChanges'
import { EntitiesMethods } from '@shared/model/log'
import { useCallback } from 'react'
import useCreateLog from './useCreateLog'

export function useCancelLog(log: LogFragment) {
  const createLog = useCreateLog()
  const [cancelLog] = useCancelLogMutation()

  const [getMember] = useGetMemberLazyQuery()
  const [updateMember] = useUpdateMemberMutation()
  const [getCircle] = useGetCircleLazyQuery()
  const [updateCircle] = useUpdateCircleMutation()
  const [getRole] = useGetRoleLazyQuery()
  const [updateRole] = useUpdateRoleMutation()
  const [getCircleMember] = useGetCircleMemberLazyQuery()
  const [updateCircleMember] = useUpdateCircleMemberMutation()
  const [getTask] = useGetTaskLazyQuery()
  const [updateTask] = useUpdateTaskMutation()
  const [getDecision] = useGetDecisionLazyQuery()
  const [updateDecision] = useUpdateDecisionMutation()
  const [getThread] = useGetThreadLazyQuery()
  const [updateThread] = useUpdateThreadMutation()

  const methods: EntitiesMethods = {
    members: {
      async get(id: string) {
        const { data } = await getMember({ variables: { id } })
        return data?.member_by_pk || undefined
      },
      async update(id, values) {
        const { data } = await updateMember({ variables: { id, values } })
        if (!data?.update_member_by_pk) {
          throw new Error('Unauthorized')
        }
      },
    },
    circles: {
      async get(id: string) {
        const { data } = await getCircle({ variables: { id } })
        return data?.circle_by_pk || undefined
      },
      async update(id, values) {
        const { data } = await updateCircle({ variables: { id, values } })
        if (!data?.update_circle_by_pk) {
          throw new Error('Unauthorized')
        }
      },
    },
    circlesMembers: {
      async get(id: string) {
        const { data } = await getCircleMember({ variables: { id } })
        return data?.circle_member_by_pk || undefined
      },
      async update(id, values) {
        const { data } = await updateCircleMember({
          variables: { id, values },
        })
        if (!data?.update_circle_member_by_pk) {
          throw new Error('Unauthorized')
        }
      },
    },
    roles: {
      async get(id: string) {
        const { data } = await getRole({ variables: { id } })
        return data?.role_by_pk || undefined
      },
      async update(id, values) {
        const { data } = await updateRole({ variables: { id, values } })
        if (!data?.update_role_by_pk) {
          throw new Error('Unauthorized')
        }
      },
    },
    tasks: {
      async get(id: string) {
        const { data } = await getTask({ variables: { id } })
        return data?.task_by_pk || undefined
      },
      async update(id, values) {
        const { data } = await updateTask({ variables: { id, values } })
        if (!data?.update_task_by_pk) {
          throw new Error('Unauthorized')
        }
      },
    },
    decisions: {
      async get(id: string) {
        const { data } = await getDecision({ variables: { id } })
        return data?.decision_by_pk || undefined
      },
      async update(id, values) {
        const { data } = await updateDecision({ variables: { id, values } })
        if (!data?.update_decision_by_pk) {
          throw new Error('Unauthorized')
        }
      },
    },
    thread: {
      async get(id: string) {
        const { data } = await getThread({ variables: { id } })
        return data?.thread_by_pk || undefined
      },
      async update(id, values) {
        const { data } = await updateThread({ variables: { id, values } })
        if (!data?.update_thread_by_pk) {
          throw new Error('Unauthorized')
        }
      },
    },
  }

  // Detect changes in logged updated entities since the log
  const hasChanged = useAsyncMemo(
    () => detectRecentEntitiesChanges(log, methods),
    [log],
    false
  )

  // Cancel log
  const cancel = useCallback(async () => {
    // Revert changes
    const changes = await cancelLogChanges(log, methods)

    // No changes, don't cancel log
    console.log('cancelLog', changes)
    if (Object.values(changes).every((c) => c.length === 0)) return

    await cancelLog({ variables: { id: log.id } })

    // Log cancelation
    createLog({
      display: log.display,
      changes,
      meetingId: log.meetingId,
      taskId: log.taskId,
      threadId: log.threadId,
      ...(!log.cancelLogId
        ? {
            cancelLogId: log.id,
            cancelMemberId: log.memberId,
            cancelMemberName: log.memberName,
          }
        : {}),
    })
  }, [log])

  return {
    hasChanged,
    cancel,
  }
}
