import { Participant, ParticipantMember } from '@shared/model/member'
import { Optional } from '@shared/model/types'

export function groupParticipantsByMember(
  participants: Optional<Participant, 'circleId'>[]
): ParticipantMember[] {
  const participantsMembers = new Map<string, ParticipantMember>()
  for (const participant of participants) {
    const participantMember = participantsMembers.get(participant.member.id)
    if (participantMember) {
      if (
        participant.circleId &&
        participantMember.circlesIds.indexOf(participant.circleId) === -1
      ) {
        participantMember.circlesIds.push(participant.circleId)
      }
    } else {
      participantsMembers.set(participant.member.id, {
        member: participant.member,
        circlesIds: participant.circleId ? [participant.circleId] : [],
      })
    }
  }
  return [...participantsMembers.values()]
}
