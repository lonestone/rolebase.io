import { MeetingAttendee } from '../model/meeting'
import { EntityFilters, EntityWithParticipants } from '../model/types'

export default function filterEntities<
  Entity extends EntityWithParticipants & {
    attendees?: MeetingAttendee[] | null
  }
>(
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

  if (filter === EntityFilters.Invited || filter === EntityFilters.NotInvited) {
    if (!currentMemberId) return []
    // Invited or not
    return data.filter((entry) => {
      const invited = entry.attendees
        ? // Check attendees if there is one
          entry.attendees.some(
            (attendee) => attendee.memberId === currentMemberId
          )
        : // Otherwise, check participants list and current member circles
          entry.participantsMembersIds.includes(currentMemberId) ||
          currentMemberCirclesIds?.includes(entry.circleId)

      return (filter === EntityFilters.Invited) === invited
    })
  }

  return []
}
