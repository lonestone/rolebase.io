import { WithId } from './types'

// Organization
export interface Org {
  name: string
  ownersIds: string[] // Ids of users that own the organization
  archived: boolean
  // Default work duration for every role
  // Can be overriden by role or by circle member
  defaultWorkedMinPerWeek: number
}

export type OrgEntry = WithId<Org>
