import { getAllCircleMembersParticipants } from '@shared/helpers/getAllCircleMembersParticipants'
import { getCircleParticipants } from '@shared/helpers/getCircleParticipants'
import { MemberEntry, MembersScope, Participant } from '@shared/member'
import { Optional } from '@shared/types'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export interface ParticipantMember {
  member: MemberEntry
  circlesIds: string[]
}

export default function useParticipants(
  circleId?: string,
  scope?: MembersScope,
  extraMembersIds?: string[]
): ParticipantMember[] {
  const members = useStoreState((state) => state.members.entries)
  const circles = useStoreState((state) => state.circles.entries)
  const roles = useStoreState((state) => state.roles.entries)

  return useMemo(() => {
    if (!members) return []
    let participants: Optional<Participant, 'circleId'>[] = []

    if (circleId && scope && circles && roles) {
      if (scope === MembersScope.Organization) {
        // All Organization Members
        participants =
          members?.map((m) => ({
            memberId: m.id,
          })) || []
      } else if (scope === MembersScope.CircleLeaders) {
        // Circle Leaders and links
        participants = getCircleParticipants(circleId, circles, roles)
      } else if (scope === MembersScope.CircleMembers) {
        // All Circle Members
        participants = getAllCircleMembersParticipants(circleId, circles, roles)
      }
    }

    // Add extra members
    if (extraMembersIds) {
      participants.push(...extraMembersIds.map((id) => ({ memberId: id })))
    }

    // Map participants to members
    // with list of circles ids where it's participating
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
  }, [circleId, scope, extraMembersIds, members, circles, roles])
}
