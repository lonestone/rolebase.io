import firebase from 'firebase/app'

export interface Member {
  orgId: string
  name: string
  picture?: string | null
  userId?: string | null
  inviteEmail?: string
  inviteDate?: firebase.firestore.Timestamp | null
  workedMinPerWeek?: number | null
}

export type MemberEntry = Member & { id: string }
export type MemberCreate = Member
export type MemberUpdate = Partial<Member>
