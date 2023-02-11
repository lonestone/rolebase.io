import { Member_Scope_Enum } from '@gql'
import { getAllCircleMembersParticipants } from '@shared/helpers/getAllCircleMembersParticipants'
import { getCircleParticipants } from '@shared/helpers/getCircleParticipants'
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
        participants =
          members?.map((m) => ({
            memberId: m.id,
          })) || []
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
      participants.push(...extraMembersIds.map((id) => ({ memberId: id })))
    }

    // Map participants to members
    // with list of circles ids where they're participating
    const participantsMembers: ParticipantMember[] = []
    for (const participant of participants) {
      const participantMember = participantsMembers.find(
        (p) => p.member.id === participant.memberId
      )
      if (participantMember) {
        if (
          participant.circleId &&
          participantMember.circlesIds.indexOf(participant.circleId) === -1
        ) {
          participantMember.circlesIds.push(participant.circleId)
        }
      } else {
        const member = members?.find((m) => m.id === participant.memberId)
        if (!member) continue
        participantsMembers.push({
          member,
          circlesIds: participant.circleId ? [participant.circleId] : [],
        })
      }
    }

    return participantsMembers
  }, [circleId, scope, extraMembersIds, members, circles])
}
