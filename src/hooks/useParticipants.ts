import { Member_Scope_Enum } from '@gql'
import { getParticipantsByScope } from '@shared/helpers/getParticipantsByScope'
import { ParticipantMember } from '@shared/model/member'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useParticipants(
  circleId?: string,
  scope?: Member_Scope_Enum,
  extraMembersIds?: string[]
): ParticipantMember[] {
  const members = useStoreState((state) => state.org.members)
  const circles = useStoreState((state) => state.org.circles)

  return useMemo(() => {
    if (!members) return []

    return circleId && scope && circles
      ? getParticipantsByScope(
          members,
          circleId,
          circles,
          scope,
          extraMembersIds ?? []
        )
      : []
  }, [circleId, scope, extraMembersIds, members, circles])
}
