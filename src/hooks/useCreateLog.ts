import { createLog } from '@api/entities/logs'
import { Log } from '@shared/model/log'
import { Optional } from '@shared/model/types'
import { store } from '@store/index'
import { useCallback } from 'react'

export default function useCreateLog() {
  return useCallback(
    async (
      log: Optional<
        Log,
        | 'orgId'
        | 'userId'
        | 'memberId'
        | 'memberName'
        | 'createdAt'
        | 'meetingId'
      >
    ) => {
      const orgId = store.getState().orgs.currentId
      if (!orgId) throw new Error('No orgId')

      const userId = store.getState().auth.user?.id
      if (!userId) throw new Error('No userId')

      const currentMember = store
        .getState()
        .members.entries?.find((member) => member.userId === userId)
      if (!currentMember) throw new Error('No currentMember')

      await createLog({
        orgId,
        userId,
        memberId: currentMember.id,
        memberName: currentMember.name,
        meetingId: currentMember.meetingId || null,
        ...log,
      })
    },
    []
  )
}
