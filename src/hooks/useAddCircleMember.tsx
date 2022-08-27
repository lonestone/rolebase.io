import { addMemberToCircle } from '@api/entities/circles'
import useCreateLog from '@hooks/useCreateLog'
import { CircleWithRoleEntry } from '@shared/model/circle'
import { LogType } from '@shared/model/log'
import { useStoreState } from '@store/hooks'
import { useCallback } from 'react'

export default function useAddCircleMember() {
  const members = useStoreState((state) => state.members.entries)
  const createLog = useCreateLog()

  return useCallback(
    async (circle: CircleWithRoleEntry, memberId: string) => {
      const changes = await addMemberToCircle(memberId, circle.id)

      // Log change
      const member = members?.find((m) => m.id === memberId)
      if (member) {
        createLog({
          display: {
            type: LogType.CircleMemberAdd,
            id: circle.id,
            name: circle.role.name,
            memberId: member.id,
            memberName: member.name,
          },
          changes,
        })
      }
    },
    [members]
  )
}
