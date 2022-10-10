import { Timestamp } from 'firebase/firestore'
import { WithId } from './types'

export interface User {
  name: string
  email: string
  createdAt: Timestamp
  picture?: string
  refreshTokenTime?: number
}

export type UserEntry = WithId<User>
