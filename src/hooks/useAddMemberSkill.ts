import { useCreateSkillMutation } from '@gql'
import useCreateLog from '@hooks/useCreateLog'
import { EntityChangeType, LogType } from '@shared/model/log'
import { omit } from '@utils/omit'
import { useCallback } from 'react'

export default function useAddMemberSkill() {
  const [createSkill] = useCreateSkillMutation()
  const createLog = useCreateLog()

  return useCallback(async (circleId: string, memberId: string) => {
    const { data, errors } = await createSkill({
      variables: {
        values: {
          categoryId: '1',
          description: 'test',
          name: 'test',
          skill_levels,
        },
      },
    })
    if (errors?.length) throw errors[0]
    const circleMember = data?.insert_circle_member_one!

    // Log change
    createLog({
      display: {
        type: LogType.CircleMemberAdd,
        id: circleMember.circleId,
        name: circleMember.circle.role.name,
        memberId: circleMember.member.id,
        memberName: circleMember.member.name,
      },
      changes: {
        circlesMembers: [
          {
            type: EntityChangeType.Create,
            id: circleMember.id,
            data: omit(circleMember, 'circle', 'member'),
          },
        ],
      },
    })
  }, [])
}
