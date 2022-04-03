import { createLog } from '@api/entities/logs'
import { Log } from '@shared/log'
import { Optional } from '@shared/types'
import { useStoreState } from '@store/hooks'
import { useCallback } from 'react'
import useCurrentMember from './useCurrentMember'
import { useOrgId } from './useOrgId'

export default function useCreateLog() {
  const orgId = useOrgId()
  const userId = useStoreState((state) => state.auth.user?.id)
  const currentMember = useCurrentMember()

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
      if (!orgId) throw new Error('No orgId')
      if (!userId) throw new Error('No userId')
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
    [orgId, userId]
  )
}
