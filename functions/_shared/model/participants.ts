import { Member_Scope_Enum } from '@gql'
import { MeetingAttendee } from './meeting'

export interface EntityWithParticipants {
  circleId: string
  participantsScope: Member_Scope_Enum
  participantsMembersIds: string[]
  attendees?: MeetingAttendee[] | null
}

export enum EntityFilters {
  All = 'All',
  Circle = 'Circle',
  Invited = 'Invited',
  NotInvited = 'NotInvited',
}
