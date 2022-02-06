import { createLog } from '@api/entities/logs'
import { Log } from '@shared/log'
import { Optional } from '@shared/types'
import { useStoreState } from '@store/hooks'
import { useCallback } from 'react'

export default function useCreateLog() {
  const orgId = useStoreState((state) => state.orgs.currentId)
  const userId = useStoreState((state) => state.auth.user?.id)

  return useCallback(
    (log: Optional<Log, 'orgId' | 'userId' | 'createdAt'>) => {
      if (!orgId) throw new Error('No orgId')
      if (!userId) throw new Error('No userId')
      createLog({ orgId, userId, ...log })
    },
    [orgId, userId]
  )
}
