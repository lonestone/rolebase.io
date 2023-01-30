import { MemberFragment } from '@gql'

export interface Participant {
  circleId: string
  memberId: string
}

// Member with its represented circles in a specific context (eg: a meeting)
export interface ParticipantMember {
  member: MemberFragment
  // Represented circles
  circlesIds: string[]
}

export interface MemberPreferences {
  calendarShowWeekend?: boolean
}
