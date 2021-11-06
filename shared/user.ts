import { WithId } from './types'

export interface User {
  name: string
  email: string
  picture?: string
}

export type UserEntry = WithId<User>
