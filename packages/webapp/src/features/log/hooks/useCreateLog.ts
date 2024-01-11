import { LogFragment, useCreateLogMutation } from '@gql'
import { useUserId } from '@nhost/react'
import { Optional } from '@shared/model/types'
import { store } from '@store/index'
import { useCallback } from 'react'
import useSuperAdmin from '../../user/hooks/useSuperAdmin'

export default function useCreateLog() {
  const userId = useUserId()
  const isSuperAdmin = useSuperAdmin()
  const [createLog] = useCreateLogMutation()

  return useCallback(
    async (
      log: Optional<
        Omit<
          LogFragment,
          | 'id'
          | 'orgId'
          | 'userId'
          | 'memberId'
          | 'memberName'
          | 'createdAt'
          | 'canceled'
        >,
        'meetingId'
      >
    ) => {
      const state = store.getState()
      const orgId = state.org.currentId
      if (!orgId) throw new Error('No orgId')
      if (!userId) throw new Error('No userId')

      const currentMember = state.org.members?.find(
        (member) => member.userId === userId
      )
      if (!currentMember) throw new Error('No currentMember')

      await createLog({
        variables: {
          values: {
            orgId,
            memberId: currentMember.id,
            memberName: currentMember.name,
            meetingId: currentMember.meetingId || null,
            ...log,
          },
        },
      })
    },
    [isSuperAdmin, userId]
  )
}
