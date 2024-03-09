import { MemberSummaryFragment } from '../gql'

export interface Participant {
  circleId: string
  member: MemberSummaryFragment
  leader?: boolean
  invited?: boolean
}

// Unique participant member with one or more circles
export interface ParticipantMember {
  member: MemberSummaryFragment
  // Represented circles
  circlesIds: string[]
}
