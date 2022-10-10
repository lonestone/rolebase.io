import { Timestamp } from 'firebase/firestore'
import { WithId } from './types'

// Organization
export interface Org {
  name: string
  archived: boolean
  createdAt: Timestamp
  // Default work duration for every role
  // Can be overriden by role or by circle member
  defaultWorkedMinPerWeek: number
  // Optional slug to be used in urls instead of orgs/:id
  slug?: string
}

export type OrgEntry = WithId<Org>
