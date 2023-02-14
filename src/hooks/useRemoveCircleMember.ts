import { useArchiveCircleMemberMutation } from '@gql'
import useCreateLog from '@hooks/useCreateLog'
import { EntityChangeType, LogType } from '@shared/model/log'
import { useCallback } from 'react'

export default function useRemoveCircleMember() {
  const [archiveCircleMember] = useArchiveCircleMemberMutation()
  const createLog = useCreateLog()

  return useCallback(async (circleId: string, memberId: string) => {
    const { data, errors } = await archiveCircleMember({
      variables: { memberId, circleId },
    })
    if (errors?.length) throw errors[0]
    const circleMember = data?.update_circle_member?.returning[0]!

    // Log change
    createLog({
      display: {
        type: LogType.CircleMemberRemove,
        id: circleMember.circleId,
        name: circleMember.circle.role.name,
        memberId: circleMember.member.id,
        memberName: circleMember.member.name,
      },
      changes: {
        circlesMembers: [
          {
            type: EntityChangeType.Update,
            id: circleMember.id,
            prevData: { archived: false },
            newData: { archived: true },
          },
        ],
      },
    })
  }, [])
}
