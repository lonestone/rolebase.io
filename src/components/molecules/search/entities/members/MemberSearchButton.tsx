import { createMember } from '@api/entities/members'
import useCreateLog from '@hooks/useCreateLog'
import { useOrgId } from '@hooks/useOrgId'
import { useOrgRole } from '@hooks/useOrgRole'
import { EntityChangeType, LogType } from '@shared/log'
import { MemberEntry } from '@shared/member'
import { ClaimRole } from '@shared/userClaims'
import React, { useCallback } from 'react'
import SearchButton, { SearchButtonProps } from '../../SearchButton'
import { useMemberSearchItems } from './useMemberSearchItems'

interface Props extends Omit<SearchButtonProps, 'items'> {
  members?: MemberEntry[] // If not provided, use store
  excludeIds?: string[]
}

export default function MemberSearchButton({
  members,
  excludeIds,
  ...props
}: Props) {
  const items = useMemberSearchItems(members, excludeIds)
  const orgId = useOrgId()
  const role = useOrgRole()
  const createLog = useCreateLog()

  const handleCreate = useCallback(
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

  return (
    <SearchButton
      {...props}
      items={items}
      onCreate={role === ClaimRole.Admin ? handleCreate : undefined}
    />
  )
}
