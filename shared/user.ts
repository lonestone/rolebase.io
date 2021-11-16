import firebase from 'firebase'
import { WithId } from './types'

export interface User {
  name: string
  email: string
  createdAt: firebase.firestore.Timestamp
  picture?: string
}

export type UserEntry = WithId<User>
