import { WithId } from './types'

export interface User {
  name: string
  email: string
  createdAt: Date
  picture?: string
}

export type UserEntry = WithId<User>
