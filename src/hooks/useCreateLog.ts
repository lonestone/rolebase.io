import { createLog } from '@api/entities/logs'
import { Log } from '@shared/log'
import { Optional } from '@shared/types'
import { useStoreState } from '@store/hooks'
import { useCallback } from 'react'
import useCurrentMember from './useCurrentMember'

export default function useCreateLog() {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const userId = useStoreState((state) => state.auth.user?.id)
  const currentMember = useCurrentMember()

  return useCallback(
    (
      log: Optional<
        Log,
        'orgId' | 'userId' | 'memberId' | 'memberName' | 'createdAt'
      >
    ) => {
      if (!orgId) throw new Error('No orgId')
      if (!userId) throw new Error('No userId')
      if (!currentMember) throw new Error('No currentMember')
      createLog({
        orgId,
        userId,
        memberId: currentMember.id,
        memberName: currentMember.name,
        ...log,
      })
    },
    [orgId, userId]
  )
}
