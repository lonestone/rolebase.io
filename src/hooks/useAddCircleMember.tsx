import useCreateLog from '@hooks/useCreateLog'
import { EntityChangeType, LogType } from '@shared/model/log'
import { useCallback } from 'react'
import { useCreateCircleMemberMutation } from 'src/graphql.generated'

export default function useAddCircleMember() {
  const [createCircleMember] = useCreateCircleMemberMutation()
  const createLog = useCreateLog()

  return useCallback(async (circleId: string, memberId: string) => {
    const { data, errors } = await createCircleMember({
      variables: { memberId, circleId },
    })
    if (errors?.length) throw errors[0]
    const circleMember = data?.insert_circle_member_one!

    // Log change
    createLog({
      display: {
        type: LogType.CircleMemberAdd,
        id: circleMember.id,
        name: circleMember.circle.role.name,
        memberId: circleMember.member.id,
        memberName: circleMember.member.name,
      },
      changes: {
        circlesMembers: [
          {
            type: EntityChangeType.Create,
            id: circleMember.id,
            data: {
              memberId,
              archived: false,
            },
          },
        ],
      },
    })
  }, [])
}
