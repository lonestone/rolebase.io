import { MemberSummaryFragment } from '@gql'

export interface Participant {
  circleId: string
  member: MemberSummaryFragment
  leader?: boolean
}

// Member with its represented circles in a specific context (eg: a meeting)
export interface ParticipantMember {
  member: MemberSummaryFragment
  // Represented circles
  circlesIds: string[]
}

export interface MemberPreferences {
  calendarShowWeekend?: boolean
  ratedApp?: boolean
}
