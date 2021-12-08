import getAllCircleMembersParticipants from '@shared/getAllCircleMembersParticipants'
import getCircleParticipants from '@shared/getCircleParticipants'
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
    if (!circleId || !scope || !circles || !members || !roles) return []
    let participants: Optional<Participant, 'circleId'>[] = []

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

    // Add extra members
    if (extraMembersIds) {
      participants.push(...extraMembersIds.map((id) => ({ memberId: id })))
    }

    // Map participants to members
    // with list of circles ids where it's participating
    const participantsMembers: ParticipantMember[] = []
    for (const participant of participants) {
      let participantMember = participantsMembers.find(
        (p) => p.member.id === participant.memberId
      )
      if (!participantMember) {
        const member = members?.find((m) => m.id === participant.memberId)
        if (member) {
          participantMember = { member, circlesIds: [] }
          participantsMembers.push(participantMember)
        }
      }
      if (participantMember && participant.circleId) {
        participantMember.circlesIds.push(participant.circleId)
      }
    }

    return participantsMembers
  }, [circleId, scope, extraMembersIds, members, circles, roles])
}
