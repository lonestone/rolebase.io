import firebase from 'firebase/app'
import { WithId } from './types'

export interface Member {
  orgId: string
  name: string
  picture?: string | null
  userId?: string | null
  inviteEmail?: string
  inviteDate?: firebase.firestore.Timestamp | null
  workedMinPerWeek?: number | null
}

export type MemberEntry = WithId<Member>
