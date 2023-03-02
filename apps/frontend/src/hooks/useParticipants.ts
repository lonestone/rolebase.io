import { Member_Scope_Enum } from '@gql'
import { getAllCircleMembersParticipants } from '@shared/helpers/getAllCircleMembersParticipants'
import { getCircleParticipants } from '@shared/helpers/getCircleParticipants'
import { groupParticipantsByMember } from '@shared/helpers/groupParticipantsByMember'
import { Participant, ParticipantMember } from '@shared/model/member'
import { Optional } from '@shared/model/types'
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
    let participants: Optional<Participant, 'circleId'>[] = []

    if (circleId && scope && circles) {
      if (scope === Member_Scope_Enum.Organization) {
        // All Organization Members
        participants = members?.map((member) => ({ member })) || []
      } else if (scope === Member_Scope_Enum.CircleLeaders) {
        // Circle Leaders and links
        participants = getCircleParticipants(circleId, circles)
      } else if (scope === Member_Scope_Enum.CircleMembers) {
        // All Circle Members
        participants = getAllCircleMembersParticipants(circleId, circles)
      }
    }

    // Add extra members
    if (extraMembersIds) {
      for (const memberId of extraMembersIds) {
        const member = members.find((m) => m.id === memberId)
        if (member) {
          participants.push({ member })
        }
      }
    }

    return groupParticipantsByMember(participants)
  }, [circleId, scope, extraMembersIds, members, circles])
}
