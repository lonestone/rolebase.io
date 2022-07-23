import { createMember } from '@api/entities/members'
import useCreateLog from '@hooks/useCreateLog'
import { useOrgId } from '@hooks/useOrgId'
import { EntityChangeType, LogType } from '@shared/model/log'
import { useCallback } from 'react'

export default function useCreateMember() {
  const orgId = useOrgId()
  const createLog = useCreateLog()

  return useCallback(
    async (name: string) => {
      if (!orgId) throw new Error()

      // Create member
      const member = await createMember({ orgId, name })

      // Log change
      createLog({
        display: {
          type: LogType.MemberCreate,
          id: member.id,
          name: member.name,
        },
        changes: {
          members: [
            { type: EntityChangeType.Create, id: member.id, data: member },
          ],
        },
      })

      return member.id
    },
    [orgId]
  )
}
