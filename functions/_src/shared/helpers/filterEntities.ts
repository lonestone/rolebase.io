import { Member_Scope_Enum } from '@gql'
import { EntityFilters, EntityWithParticipants } from '../model/participants'

export default function filterEntities<Entity extends EntityWithParticipants>(
  filter: EntityFilters,
  data: Entity[],
  circleId?: string,
  currentMemberId?: string,
  currentMemberCirclesIds?: string[]
): Entity[] {
  if (!data) return []

  // Select all
  if (filter === EntityFilters.All) {
    return data
  }

  // Specific circle
  if (filter === EntityFilters.Circle) {
    return data.filter((entry) => entry.circleId === circleId)
  }

  // Invited or not
  if (filter === EntityFilters.Invited || filter === EntityFilters.NotInvited) {
    if (!currentMemberId) return []
    const expectInvited = filter === EntityFilters.Invited
    return data.filter(
      (entry) =>
        expectInvited ===
        isInvitedToEntity(entry, currentMemberId, currentMemberCirclesIds)
    )
  }

  return []
}

function isInvitedToEntity<Entity extends EntityWithParticipants>(
  entity: Entity,
  currentMemberId: string,
  currentMemberCirclesIds?: string[]
): boolean {
  // Check attendees if there is one
  if (entity.attendees) {
    return entity.attendees.some(
      (attendee) => attendee.memberId === currentMemberId
    )
  }

  // Members explicitly invited
  if (entity.participantsMembersIds.includes(currentMemberId)) {
    return true
  }

  // Organization scope
  if (entity.participantsScope === Member_Scope_Enum.Organization) {
    return true
  }

  // Circle leaders scope
  if (
    entity.participantsScope === Member_Scope_Enum.CircleLeaders &&
    currentMemberCirclesIds?.includes(entity.circleId)
  ) {
    return true
  }

  // All circle members scope
  if (
    entity.participantsScope === Member_Scope_Enum.CircleMembers &&
    currentMemberCirclesIds?.includes(entity.circleId) // FIX: Should be all circle members
  ) {
    return true
  }

  return false
}
