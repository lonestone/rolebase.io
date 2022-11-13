import useCreateLog from '@hooks/useCreateLog'
import { useOrgId } from '@hooks/useOrgId'
import { EntityChangeType, LogType } from '@shared/model/log'
import { useCallback } from 'react'
import { useCreateMemberMutation } from 'src/graphql.generated'
import { pick } from 'src/utils'

export default function useCreateMember() {
  const orgId = useOrgId()
  const createLog = useCreateLog()
  const [createMember] = useCreateMemberMutation()

  return useCallback(
    async (name: string) => {
      if (!orgId) throw new Error()

      // Create member
      const memberResult = await createMember({ variables: { orgId, name } })
      const member = memberResult.data?.insert_member_one
      if (!member) throw new Error('Error while creating member')

      // Log change
      createLog({
        display: {
          type: LogType.MemberCreate,
          id: member.id,
          name: member.name,
        },
        changes: {
          members: [
            {
              type: EntityChangeType.Create,
              id: member.id,
              data: pick(member, 'orgId', 'name', 'description', 'archived'),
            },
          ],
        },
      })

      return member.id
    },
    [orgId, createMember, createLog]
  )
}
